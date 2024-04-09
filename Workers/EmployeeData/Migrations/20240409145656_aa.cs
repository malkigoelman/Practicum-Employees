using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Employee.Data.Migrations
{
    public partial class aa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_RoleNames_NameID",
                table: "Roles");

            migrationBuilder.RenameColumn(
                name: "NameID",
                table: "Roles",
                newName: "RoleNameId");

            migrationBuilder.RenameIndex(
                name: "IX_Roles_NameID",
                table: "Roles",
                newName: "IX_Roles_RoleNameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_RoleNames_RoleNameId",
                table: "Roles",
                column: "RoleNameId",
                principalTable: "RoleNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_RoleNames_RoleNameId",
                table: "Roles");

            migrationBuilder.RenameColumn(
                name: "RoleNameId",
                table: "Roles",
                newName: "NameID");

            migrationBuilder.RenameIndex(
                name: "IX_Roles_RoleNameId",
                table: "Roles",
                newName: "IX_Roles_NameID");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_RoleNames_NameID",
                table: "Roles",
                column: "NameID",
                principalTable: "RoleNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
