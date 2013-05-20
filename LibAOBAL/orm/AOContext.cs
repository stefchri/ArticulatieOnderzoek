using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using LibAOModels;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace LibAOBAL.orm
{
    public class AOContext : DbContext
    {
        public IDbSet<Admin> Admins { get; set; }
        public IDbSet<Error> Errors { get; set; }
        public IDbSet<Result> Results { get; set; }
        public IDbSet<Image> Images { get; set; }
        public IDbSet<Routine> Routines { get; set; }
        public IDbSet<RoutineImage> RoutineImages { get; set; }
        public IDbSet<Test> Tests { get; set; }
        public IDbSet<User> Users { get; set; }
        

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //PLURAL REMOVAL
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            //WE USE FLUENT API FOR MAPPING PURPOSES
            //--------------------------------------

            //ADMIN
            modelBuilder.Entity<Admin>().HasKey(d => d.ID);
            modelBuilder.Entity<Admin>()
                .Property(a => a.ID)
                .HasColumnName("admin_id")
                .IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Admin>()
                .Property(a => a.Email)
                .HasColumnName("admin_email")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Admin>()
                .Property(a => a.Password)
                .HasColumnName("admin_password")
                .IsRequired()
                .HasMaxLength(64);
            modelBuilder.Entity<Admin>()
                .Property(a => a.PasswordSalt)
                .HasColumnName("admin_passwordsalt")
                .IsRequired()
                .HasMaxLength(64);
            modelBuilder.Entity<Admin>()
                .Property(a => a.Firstname)
                .HasColumnName("admin_firstname")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Admin>()
                .Property(a => a.Surname)
                .HasColumnName("admin_surname")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Admin>()
                .Property(a => a.Gender)
                .HasColumnName("admin_gender")
                .IsRequired()
                .HasMaxLength(10);
            modelBuilder.Entity<Admin>()
                .Property(a => a.Createddate)
                .HasColumnName("admin_createddate")
                .IsRequired();
            modelBuilder.Entity<Admin>()
                .Property(a => a.Modifieddate)
                .HasColumnName("admin_modifieddate")
                .IsOptional();
            modelBuilder.Entity<Admin>()
                .Property(a => a.Deleteddate)
                .HasColumnName("admin_deleteddate")
                .IsOptional();
            modelBuilder.Entity<Admin>()
                .Property(a => a.Lastloggedindate)
                .HasColumnName("admin_lastloggedindate")
                .IsOptional();
            modelBuilder.Entity<Admin>().ToTable("admins");

            //ERRORS
            modelBuilder.Entity<Error>().HasKey(d => d.ID);
            modelBuilder.Entity<Error>()
                .Property(a => a.ID)
                .HasColumnName("error_id")
                .IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Error>()
                .Property(a => a.Name)
                .HasColumnName("error_name")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Error>().ToTable("errors");

            //RESULTS
            modelBuilder.Entity<Result>().HasKey(d => d.ID);
            modelBuilder.Entity<Result>()
                .Property(a => a.ID)
                .HasColumnName("result_id")
                .IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Result>()
                .Property(a => a.Order)
                .HasColumnName("test_order");
            modelBuilder.Entity<Result>()
                .Property(a => a.AudioSource)
                .HasColumnName("result_audiosource");
            modelBuilder.Entity<Result>()
                .Property(a => a.Phonetic)
                .HasColumnName("result_phonetic");
            modelBuilder.Entity<Result>()
                .Property(a => a.Value)
                .HasColumnName("result_value");
            modelBuilder.Entity<Result>()
                .Property(c => c.TestID)
                .HasColumnName("test_id")
                .IsRequired();
            modelBuilder.Entity<Result>()
                .HasRequired(c => c.Test)
                .WithMany(c => c.Results)
                .HasForeignKey(s => s.TestID).WillCascadeOnDelete(false);
            modelBuilder.Entity<Result>()
                .HasMany(e => e.Errors)
                .WithMany(e => e.Results)
                .Map(m =>
                {
                    m.ToTable("results_has_errors");
                    m.MapLeftKey("result_id");
                    m.MapRightKey("error_id");
                }
            );
            modelBuilder.Entity<Result>().ToTable("results");

            //IMAGES
            modelBuilder.Entity<Image>().HasKey(d => d.ID);
            modelBuilder.Entity<Image>()
                .Property(a => a.ID)
                .HasColumnName("image_id")
                .IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Image>()
                .Property(a => a.Name)
                .HasColumnName("image_name")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Image>()
                .Property(a => a.Url)
                .HasColumnName("image_url")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Image>()
                .Property(a => a.Phonetic)
                .HasColumnName("image_phonetic")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Image>()
                .Property(a => a.Sentence)
                .HasColumnName("image_sentence")
                .IsRequired()
                .HasMaxLength(500);
            modelBuilder.Entity<Image>()
                .Property(a => a.SoundUrl)
                .HasColumnName("image_soundurl")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Image>()
                .Property(c => c.AdminCreatedID)
                .HasColumnName("image_admin")
                .IsRequired();
            modelBuilder.Entity<Image>()
                .HasRequired(c => c.AdminCreated)
                .WithMany(c => c.Images)
                .HasForeignKey(s => s.AdminCreatedID).WillCascadeOnDelete(false);
            modelBuilder.Entity<Image>()
               .Property(c => c.Createddate)
               .HasColumnName("image_createddate")
               .IsRequired();
            modelBuilder.Entity<Image>()
               .Property(c => c.Modifieddate)
               .HasColumnName("image_modifieddate")
               .IsOptional();
            modelBuilder.Entity<Image>()
                .HasMany(a => a.Routines)
                .WithRequired(ri => ri.Image)
                .HasForeignKey(ri => ri.ImageId);
            modelBuilder.Entity<Image>().ToTable("images");

            //ROUTINES
            modelBuilder.Entity<Routine>().HasKey(d => d.ID);
            modelBuilder.Entity<Routine>()
                .Property(a => a.ID)
                .HasColumnName("routine_id")
                .IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Routine>()
                .Property(a => a.Name)
                .HasColumnName("routine_name")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<Routine>()
                .Property(a => a.Createddate)
                .HasColumnName("routine_createddate")
                .IsRequired();
            modelBuilder.Entity<Routine>()
                .Property(a => a.Modifieddate)
                .HasColumnName("routine_modifieddate")
                .IsOptional();
            modelBuilder.Entity<Routine>()
                .Property(a => a.Deleteddate)
                .HasColumnName("routine_deleteddate")
                .IsOptional();
            modelBuilder.Entity<Routine>()
                .Property(c => c.AdminID)
                .HasColumnName("admin_created")
                .IsRequired();
            modelBuilder.Entity<Routine>()
                .HasRequired(c => c.AdminCreated)
                .WithMany(c => c.Routines)
                .HasForeignKey(s => s.AdminID).WillCascadeOnDelete(false);
            modelBuilder.Entity<Routine>()
                .HasMany(a => a.ImagesInRoutine)
                .WithRequired(ri => ri.Routine)
                .HasForeignKey(ri => ri.RoutineId);
            modelBuilder.Entity<Routine>().ToTable("routines");

            //RoutineImages
            modelBuilder.Entity<RoutineImage>().HasKey(ri => new { ri.RoutineId, ri.ImageId });
            modelBuilder.Entity<RoutineImage>()
                .Property(ri => ri.ImageOrder)
                .HasColumnName("image_order")
                .IsRequired();
            modelBuilder.Entity<RoutineImage>()
                .Property(c => c.RoutineId)
                .HasColumnName("routine_id")
                .IsRequired();
            modelBuilder.Entity<RoutineImage>()
                .HasRequired(c => c.Routine)
                .WithMany(c => c.ImagesInRoutine)
                .HasForeignKey(s => s.RoutineId);
            modelBuilder.Entity<RoutineImage>()
                .Property(c => c.ImageId)
                .HasColumnName("image_id")
                .IsRequired();
            modelBuilder.Entity<RoutineImage>()
                .HasRequired(c => c.Image)
                .WithMany(c => c.Routines)
                .HasForeignKey(s => s.ImageId);
            modelBuilder.Entity<RoutineImage>().ToTable("routines_has_images");

            //TESTS
            modelBuilder.Entity<Test>().HasKey(d => d.ID);
            modelBuilder.Entity<Test>()
                .Property(a => a.ID)
                .HasColumnName("test_id")
                .IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Test>()
                .Property(a => a.Kind)
                .HasColumnName("test_kind")
                .IsRequired()
                .HasMaxLength(20);
            modelBuilder.Entity<Test>()
                .Property(a => a.Createddate)
                .HasColumnName("test_createddate")
                .IsRequired();
            modelBuilder.Entity<Test>()
                .Property(a => a.Modifieddate)
                .HasColumnName("test_modifieddate")
                .IsOptional();
            modelBuilder.Entity<Test>()
                .Property(a => a.Deleteddate)
                .HasColumnName("test_deleteddate")
                .IsOptional();
            modelBuilder.Entity<Test>()
                .Property(a => a.Finisheddate)
                .HasColumnName("test_finisheddate")
                .IsOptional();
            modelBuilder.Entity<Test>()
                .Property(a => a.Analyseddate)
                .HasColumnName("test_analyseddate")
                .IsOptional();
            modelBuilder.Entity<Test>()
                .Property(a => a.Comment)
                .HasColumnName("test_comment")
                .IsOptional();
            modelBuilder.Entity<Test>()
                .Property(a => a.ForStatistics)
                .HasColumnName("test_forstatistics")
                .IsOptional();
            modelBuilder.Entity<Test>()
                .Property(c => c.AdminID)
                .HasColumnName("admin_id")
                .IsRequired();
            modelBuilder.Entity<Test>()
                .HasRequired(c => c.Admin)
                .WithMany(c => c.Tests)
                .HasForeignKey(s => s.AdminID);
            modelBuilder.Entity<Test>()
                .Property(c => c.UserID)
                .HasColumnName("user_id")
                .IsRequired();
            modelBuilder.Entity<Test>()
                .HasRequired(c => c.User)
                .WithMany(c => c.TestsTaken)
                .HasForeignKey(s => s.UserID).WillCascadeOnDelete(false);
            modelBuilder.Entity<Test>()
                .Property(c => c.RoutineID)
                .HasColumnName("routine_id")
                .IsRequired();
            modelBuilder.Entity<Test>()
                .HasRequired(c => c.Routine)
                .WithMany(c => c.TestsUsingRoutine)
                .HasForeignKey(s => s.RoutineID);
            modelBuilder.Entity<Test>().ToTable("tests");


            //USERS
            modelBuilder.Entity<User>().HasKey(d => d.ID);
            modelBuilder.Entity<User>()
                .Property(a => a.ID)
                .HasColumnName("user_id")
                .IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<User>()
                .Property(a => a.Firstname)
                .HasColumnName("user_firstname")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<User>()
                .Property(a => a.Surname)
                .HasColumnName("user_surname")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<User>()
                .Property(a => a.Email)
                .HasColumnName("user_email")
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<User>()
                .Property(a => a.DateOfBirth)
                .HasColumnName("user_dateofbirth")
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(a => a.Gender)
                .HasColumnName("user_gender")
                .IsRequired()
                .HasMaxLength(10);
            modelBuilder.Entity<User>()
                .Property(a => a.Speech)
                .HasColumnName("user_speech")
                .IsOptional();
            modelBuilder.Entity<User>()
                .Property(a => a.Language)
                .HasColumnName("user_language")
                .IsOptional();
            modelBuilder.Entity<User>()
                .Property(a => a.Hearing)
                .HasColumnName("user_hearing")
                .IsOptional();
            modelBuilder.Entity<User>()
                .Property(a => a.Anamnesis)
                .HasColumnName("user_anamnesis")
                .IsOptional();
            modelBuilder.Entity<User>()
                .Property(a => a.Other)
                .HasColumnName("user_other")
                .IsOptional();
            modelBuilder.Entity<User>()
                .Property(a => a.Report)
                .HasColumnName("user_report")
                .IsOptional();
            modelBuilder.Entity<User>()
                .Property(a => a.Createddate)
                .HasColumnName("user_createddate")
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(a => a.Modifieddate)
                .HasColumnName("user_modifieddate")
                .IsOptional();
            modelBuilder.Entity<User>()
                .Property(a => a.Deleteddate)
                .HasColumnName("user_deleteddate")
                .IsOptional();
            modelBuilder.Entity<User>()
                .Property(c => c.AdminEnrolledID)
                .HasColumnName("admin_id")
                .IsRequired();
            modelBuilder.Entity<User>()
                .HasRequired(c => c.AdminEnrolled)
                .WithMany(c => c.Users)
                .HasForeignKey(s => s.AdminEnrolledID);
            modelBuilder.Entity<User>().ToTable("users");
        }
    }
}
