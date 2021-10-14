using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class itemsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Item",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    quantity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<double>(type: "float", nullable: false),
                    img = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.id);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "3db42bc8-303e-4110-ae90-27099b2e8128", "AQAAAAEAACcQAAAAEAWWenXslBAN/VO8DTa9YADDM2orRAg6QAlHeM2ysSBPB5nK64WdWPVXDsyBrRrkVg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Item");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e049bc34-1bfc-48da-b6b8-66a09b264b19", "AQAAAAEAACcQAAAAEMUZ3gg/13G6IrzJ+N3wc4l7Ezs32wlH3uYb5b8ZU+hIPMeD8J7rCRKSPqdVbxdEQg==" });
        }
    }
}
