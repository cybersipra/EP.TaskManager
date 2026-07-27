using System;
using System.Collections.Generic;
using System.Text;

namespace EP.TaskManager.Application.Common.Models
{
    public class Result<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public static Result<T> Ok(T data, string message = "")
        {
            return new Result<T>
            {
                Success = true,
                Message = message,
                Data = data
            };
        }
        public static Result<T> Fail(string message)
        {
            return new Result<T>
            {
                Success = false,
                Message = message
            };
        }
    }
}
