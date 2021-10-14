using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class rolees : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "5812d85c-48fe-4301-b9e4-f6d10908b6d6", "AQAAAAEAACcQAAAAELPbGDAV98sAkFjfXD2Fb0vqitsk3yQO+SNwKYNZ+v4PLKu4EcM71obRDriHT3Dcdw==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "85019249-023b-4cb6-8976-3c9cb3276908", "AQAAAAEAACcQAAAAEPNazILoOtyHO1ibn6voXP1lzP6P5b2Vcu837tCvYgcEQ9z9iyH0fKTxxm0l5AzMFw==" });
        }
    }
}
