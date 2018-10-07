using System.Threading.Tasks;

namespace MessagingApp.ApiContext.Data
{
    public partial interface IBaseRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
    }
}
