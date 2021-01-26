using Api.Models;
using Api.Models.UserModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Api.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>,
        UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {

        public DataContext(DbContextOptions<DataContext> dbContext) : base(dbContext)
        {

        }

        public DbSet<category> category { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Photo> Photo { get; set; }
        public DbSet<ProductColors> Color { get; set; }
        public DbSet<ProductSizes> Size { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<CartItem> CartItem { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(uk => new { uk.UserId, uk.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(u => u.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(u => u.UserId)
                    .IsRequired();

            });
            builder.Entity<Role>().HasData(
                    new Role { Id = 1, Name = "Customer", NormalizedName = "customer" },
                    new Role { Id = 2, Name = "Admin", NormalizedName = "admin" }
                    );

            builder.Entity<Products>()
            .HasQueryFilter(fa => fa.IsDone);

            builder.Entity<Products>()
                .Property(p => p.Price)
            .HasColumnType("decimal(18,4)");

            builder.Entity<category>()
                .HasMany(category => category.products)
                .WithOne(category => category.category)
                .OnDelete(DeleteBehavior.Restrict);


            builder.Entity<Photo>()
              .HasOne(p => p.Product)
              .WithMany(p => p.Photos)
              .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ProductColors>()
             .HasOne(p => p.Product)
             .WithMany(p => p.Colors)
             .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ProductSizes>()
            .HasOne(p => p.Product)
            .WithMany(p => p.Sizes)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CartItem>()
                .HasOne(p => p.Cart)
                .WithMany(p => p.Items)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Order>()
                .Property(p => p.Total)
                .HasColumnType("decimal(18,4)");

            builder.Entity<OrderDetail>()
                .HasOne(p => p.Order)
                .WithMany(p => p.OrderDetails)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Order>()
                .HasOne(p => p.User)
                .WithMany(p => p.Orders)
                .OnDelete(DeleteBehavior.Restrict);

        }
       
    }
}
