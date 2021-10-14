using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class itemAddedWithActualPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "actual_price",
                table: "Item",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c26e4a55-316a-4261-9f0a-b3aeb213daf3", "AQAAAAEAACcQAAAAECG7ozKVvitKHIptVkvqQty1fQQipYDmP2ZqFIvfj0ZIDYUouB3Z1I/E+Sw2M4qvtA==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "actual_price",
                table: "Item");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "3db42bc8-303e-4110-ae90-27099b2e8128", "AQAAAAEAACcQAAAAEAWWenXslBAN/VO8DTa9YADDM2orRAg6QAlHeM2ysSBPB5nK64WdWPVXDsyBrRrkVg==" });
        }
    }
}
