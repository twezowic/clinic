using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Clinic.Migrations
{
    public partial class Etap3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Appointment",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Appointment",
                type: "rowversion",
                rowVersion: true,
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Appointment");

            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Appointment",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
