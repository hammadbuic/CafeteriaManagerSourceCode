using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class a : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "status",
                table: "Order",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2441071f-c322-4f70-8378-7086a1d78c56", "AQAAAAEAACcQAAAAEFL83xXWXhtGyS3IVRWL89ce7KidX0xmPq4HjBRjxdfGQNMM6mN9UCk59BwuehbJKA==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "status",
                table: "Order");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "23a62867-00a2-49f8-9fed-ef140e80cd68", "AQAAAAEAACcQAAAAECXFnEN4WR6aBUyvwYAxRLd1Ymb4K5FyCWvFZPhYtIEb/1re5ai/rpWDrCZGEtlLww==" });
        }
    }
}
