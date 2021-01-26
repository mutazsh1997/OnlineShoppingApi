using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Data.DTOS;
using Api.Data.DTOS.ForReturn;
using Api.Data.IRepository;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly IOnlineShopping _repo;
        private readonly IMapper _mapper;
        public CategoryController(IOnlineShopping repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> getAllCategory()
        {
            var getCategories = await _repo.GetCategories();
            var categoriesToReturn = _mapper.Map<IEnumerable<categoryToReturn>>(getCategories);

            foreach (var categories in getCategories)
            {
                foreach (var category in categoriesToReturn)
                {
                    if (categories.categoryName == category.categoryName)
                    {
                        category.productCount = categories.products.Count;
                    }
                }
            }


            return Ok(categoriesToReturn);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> createCategory(categoryForCreation categoryForCreationDto)
        {

            var category = _mapper.Map<category>(categoryForCreationDto);
            await _repo.CreateNewCategory(category);

            if (await _repo.SaveChanges())
                return Ok(category);

            return BadRequest("category does not added");
        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPatch("newname/{categoryId}")]
        public async Task<IActionResult> editCategoryName(int categoryId,[FromBody] string newName)
        {
            var getCategory = await _repo.GetCategoryById(categoryId);

            getCategory.categoryName = newName;
          
            if (await _repo.SaveChanges())
            {
                return Ok();
            }

            return BadRequest();
        }
    }

}