using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class itemOrderRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Item_itemid",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_itemid",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "itemid",
                table: "Order");

            migrationBuilder.AddColumn<int>(
                name: "item_id",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d7e59ebd-f0e3-4cd3-8801-27cb1e07bb06", "AQAAAAEAACcQAAAAELsrwgGdUlH/h2s+oUOvGmIbRuYb06cRkzCUxrxqAu/X7lXzK/tL8tba6QYSoADJsA==" });

            migrationBuilder.CreateIndex(
                name: "IX_Order_item_id",
                table: "Order",
                column: "item_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Item_item_id",
                table: "Order",
                column: "item_id",
                principalTable: "Item",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Item_item_id",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_item_id",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "item_id",
                table: "Order");

            migrationBuilder.AddColumn<int>(
                name: "itemid",
                table: "Order",
                type: "int",
                nullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Item_itemid",
                table: "Order",
                column: "itemid",
                principalTable: "Item",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
