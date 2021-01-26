using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.DTOS.ForCreations;
using Api.Data.DTOS.ForReturn;
using Api.Data.Helper;
using Api.Data.IRepository;
using Api.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Api.Controllers {
    [Route ("api/products/{productId}/[controller]")]
    public class PhotoController : ControllerBase {
        private readonly IOnlineShopping _repo;
        private readonly IMapper _mapper;

        private readonly IOptions<cloudinerySettings> _cloudinaryConfig;

        private Cloudinary _cloudinary;

        public PhotoController (IOnlineShopping repo, IMapper mapper,
            IOptions<cloudinerySettings> cloudinaryConfig) {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret);

            _cloudinary = new Cloudinary (acc);
        }

        [HttpGet ("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto (Guid Id) {
            var photoFromRepo = await _repo.GetPhoto (Id);
            var photo = _mapper.Map<PhotoForReturn> (photoFromRepo);
            return Ok (photo);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        [Obsolete]
        public async Task<IActionResult> UploadPhoto (
            Guid ProductId, [FromForm] PhotoForCreation photoForCreationDto) {
            var prodFromRepo = await _repo.GetProduct (ProductId);
            var file = photoForCreationDto.file;

            var uploadResult = new ImageUploadResult ();

            if (file.Length > 0) {
                using (var stream = file.OpenReadStream ()) {
                    var uploadParams = new ImageUploadParams () {
                    File = new FileDescription (file.Name, stream),
                    Transformation = new Transformation ()
                    .Width (500).Height (500)
                    };
                    uploadResult = _cloudinary.Upload (uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString ();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo> (photoForCreationDto);

            if (!prodFromRepo.Photos.Any (p => p.IsMain)) photo.IsMain = true;
            else photo.IsMain = false;

            prodFromRepo.Photos.Add (photo);

            if (await _repo.SaveChanges ()) {
                var photoToReturn = _mapper.Map<PhotoForReturn> (photo);

                return CreatedAtRoute (nameof (GetPhoto), new { ProductId, photo.Id }, photoToReturn);
            }

            return BadRequest ("Could not add the photo");
        }
    }
}