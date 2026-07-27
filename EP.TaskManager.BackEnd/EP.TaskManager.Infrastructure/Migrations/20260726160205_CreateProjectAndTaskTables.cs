using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EP.TaskManager.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateProjectAndTaskTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EP_TM_Project",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EP_TM_Project", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EP_TM_TaskItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EP_TM_TaskItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EP_TM_TaskItem_EP_TM_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "EP_TM_Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EP_TM_TaskItem_ProjectId",
                table: "EP_TM_TaskItem",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_EP_TM_TaskItem_Status",
                table: "EP_TM_TaskItem",
                column: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EP_TM_TaskItem");

            migrationBuilder.DropTable(
                name: "EP_TM_Project");
        }
    }
}
