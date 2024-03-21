using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ReactClinic.Data;
using ReactClinic.Controllers;
using ReactClinic.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ReactClinicContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ReactClinicContext") ?? throw new InvalidOperationException("Connection string 'ReactClinicContext' not found.")));

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialize(services);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
};

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();