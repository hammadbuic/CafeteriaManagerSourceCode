using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class abcd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "order_quantity",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "23a62867-00a2-49f8-9fed-ef140e80cd68", "AQAAAAEAACcQAAAAECXFnEN4WR6aBUyvwYAxRLd1Ymb4K5FyCWvFZPhYtIEb/1re5ai/rpWDrCZGEtlLww==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "order_quantity",
                table: "Order");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "88298e72-f40b-4932-a321-a770769ce944", "AQAAAAEAACcQAAAAED5gOnq/c1ZOiBFMSILwJ0so57MyBPjBG2WNrfVe7eQRtjOvw/LCdG867/zZhQt0MQ==" });
        }
    }
}
