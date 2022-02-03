using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Server
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            Console.WriteLine("Starting....");

            var wsOptions = new WebSocketOptions { KeepAliveInterval = TimeSpan.FromMinutes(30) };

            app.UseWebSockets(wsOptions);

            app.Use(async (context, next) => {
                if (context.Request.Path == "/send")
                {
                    if (context.WebSockets.IsWebSocketRequest)
                    {
                        using (WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync())
                        {
                            Console.WriteLine("inside using AcceptWebSocketAsync");
                            Program.Server.HandShake(context, webSocket);
                            await Send(context, webSocket);
                        }
                    }
                    else
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    }
                }
            });
        }

        private async Task Send(HttpContext context, WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), System.Threading.CancellationToken.None);

            if (result != null)
            {
                while(!result.CloseStatus.HasValue)
                {
                    string msg = Encoding.UTF8.GetString(new ArraySegment<byte>(buffer, 0, result.Count));
                    Console.WriteLine($"Client says: {msg}");

                    if (msg == "rk")
                    {
                        Console.WriteLine("Client is valid.");
                        await webSocket.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes($"Authorized")), result.MessageType, result.EndOfMessage, System.Threading.CancellationToken.None);

                        var count = 5;
                        for (int i = 1; i <= count ; i++)
                        {
                            await webSocket.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes($"Server says: {DateTime.UtcNow:f}")), result.MessageType, i == count, System.Threading.CancellationToken.None);

                            Thread.Sleep(TimeSpan.FromSeconds(2));
                        }

                        result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), System.Threading.CancellationToken.None);
                    }
                    else
                    {
                        Console.WriteLine("Client not valid.");
                        await webSocket.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes($"Not authorized")), result.MessageType, result.EndOfMessage, System.Threading.CancellationToken.None);
                        result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), System.Threading.CancellationToken.None);
                    }

                    // Console.WriteLine(result);
                }
            }

            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, System.Threading.CancellationToken.None);
        }
    }
}
