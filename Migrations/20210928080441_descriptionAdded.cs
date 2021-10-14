using Microsoft.EntityFrameworkCore.Migrations;

namespace CafeteriaManageBackend.Migrations
{
    public partial class descriptionAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e049bc34-1bfc-48da-b6b8-66a09b264b19", "AQAAAAEAACcQAAAAEMUZ3gg/13G6IrzJ+N3wc4l7Ezs32wlH3uYb5b8ZU+hIPMeD8J7rCRKSPqdVbxdEQg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "390c0e5a-cb67-442f-9ec8-a841428486a4", "AQAAAAEAACcQAAAAEJTwCRVxwaXcA3Fqse1OjS3zCTlPN7u9VH9VzKih3uJr4yBJbcUeHmclGydtlVLf1w==" });
        }
    }
}
