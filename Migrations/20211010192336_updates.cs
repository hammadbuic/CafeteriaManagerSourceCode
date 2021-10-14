using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class updates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "88298e72-f40b-4932-a321-a770769ce944", "AQAAAAEAACcQAAAAED5gOnq/c1ZOiBFMSILwJ0so57MyBPjBG2WNrfVe7eQRtjOvw/LCdG867/zZhQt0MQ==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d7e59ebd-f0e3-4cd3-8801-27cb1e07bb06", "AQAAAAEAACcQAAAAELsrwgGdUlH/h2s+oUOvGmIbRuYb06cRkzCUxrxqAu/X7lXzK/tL8tba6QYSoADJsA==" });
        }
    }
}
