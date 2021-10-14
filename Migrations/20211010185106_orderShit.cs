using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class orderShit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    customer_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    delivery_address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    order_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    itemid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.id);
                    table.ForeignKey(
                        name: "FK_Order_Item_itemid",
                        column: x => x.itemid,
                        principalTable: "Item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "38363601-a50b-4009-a5cb-33362a614e0e", "AQAAAAEAACcQAAAAEAgNWiwFZKdBu63D8heV70nERWxaRUadnmb5Sl8qiATW1YoTMfn/J6D2L+rZlV1hvw==" });

            migrationBuilder.CreateIndex(
                name: "IX_Order_itemid",
                table: "Order",
                column: "itemid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c26e4a55-316a-4261-9f0a-b3aeb213daf3", "AQAAAAEAACcQAAAAECG7ozKVvitKHIptVkvqQty1fQQipYDmP2ZqFIvfj0ZIDYUouB3Z1I/E+Sw2M4qvtA==" });
        }
    }
}
