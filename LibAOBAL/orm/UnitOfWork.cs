using LibAOModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibAOBAL.orm
{
    public class UnitOfWork : IDisposable
    {
        private AOContext context = new AOContext();
        private GenericRepository<Admin> _adminRepository;
        private GenericRepository<Error> _errorRepository;
        private GenericRepository<Image> _imageRepository;
        private GenericRepository<Routine> _routineRepository;
        private GenericRepository<RoutineImage> _routineImageRepository;
        private GenericRepository<Test> _testRepository;
        private GenericRepository<User> _userRepository;

        public GenericRepository<Admin> AdminRepository
        {
            get
            {

                if (this._adminRepository == null)
                {
                    this._adminRepository = new GenericRepository<Admin>(context);
                }
                return _adminRepository;
            }
        }

        public GenericRepository<Error> ErrorRepository
        {
            get
            {

                if (this._errorRepository == null)
                {
                    this._errorRepository = new GenericRepository<Error>(context);
                }
                return _errorRepository;
            }
        }

        public GenericRepository<Image> ImageRepository
        {
            get
            {

                if (this._imageRepository == null)
                {
                    this._imageRepository = new GenericRepository<Image>(context);
                }
                return _imageRepository;
            }
        }

        public GenericRepository<Routine> RoutineRepository
        {
            get
            {

                if (this._routineRepository == null)
                {
                    this._routineRepository = new GenericRepository<Routine>(context);
                }
                return _routineRepository;
            }
        }

        public GenericRepository<RoutineImage> RoutineImageRepository
        {
            get
            {

                if (this._routineImageRepository == null)
                {
                    this._routineImageRepository = new GenericRepository<RoutineImage>(context);
                }
                return _routineImageRepository;
            }
        }

        public GenericRepository<Test> TestRepository
        {
            get
            {

                if (this._testRepository == null)
                {
                    this._testRepository = new GenericRepository<Test>(context);
                }
                return _testRepository;
            }
        }

        public GenericRepository<User> UserRepository
        {
            get
            {

                if (this._userRepository == null)
                {
                    this._userRepository = new GenericRepository<User>(context);
                }
                return _userRepository;
            }
        }

        public void Save()
        {
            try
            {
                context.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var m = ex.EntityValidationErrors;
                var l = 3;
                l++;
            }
            catch (DbUpdateException ex)
            {
                var m = ex.InnerException;
                var l = 3;
                l++;
            }
            
            
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
