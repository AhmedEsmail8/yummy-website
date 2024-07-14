export class Ui {
    displayMeals(container, data,) {
        $('section').addClass('d-none');
        console.log(container);
        let box = '';
        for (let i = 0; i < ((data.meals?.length) ? data.meals.length : 0); i++) {
            box += `<div class="col-md-3">
                    <div class="meal-card cursor-pointer w-100 rounded-3 overflow-hidden position-relative" id="${data.meals[i].idMeal}">
                        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="">
                        <div class="meal-card-overlay card-overlay d-flex align-items-center justify-content-center p-3 position-absolute top-0 bottom-0 start-0 end-0">
                            <h3>${data.meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
        }
        container.html(box);
        container.parentsUntil('body').removeClass('d-none')
    }

    displayCategories(data) {
        $('section').addClass('d-none');

        let box = ``;
        for (let i = 0; i < data.categories.length; i++) {
            let description = data.categories[i].strCategoryDescription.split(' ');
            box += `
                <div class="col-md-3">
                    <div class="category-card cursor-pointer w-100 rounded-3 overflow-hidden position-relative" id="${data.categories[i].strCategory}">
                        <img src="${data.categories[i].strCategoryThumb}" class="w-100" alt="">
                        <div class="category-card-overlay card-overlay d-flex flex-column align-items-center p-3 position-absolute top-0 bottom-0 start-0 end-0">
                            <h3>${data.categories[i].strCategory}</h3>
                            <p class="text-center">${description.slice(0, 20).toString().replaceAll(',', ' ')}</p>
                        </div>
                    </div>
                </div>
            `
        }
        $('section#categories .container .row').html(box);
        $('section#categories').removeClass('d-none');
    }

    showAreas(data) {
        $('section').addClass('d-none');
        let box = ``;
        for (let i = 0; i < (data.meals?.length) ? data.meals.length : 0; i++) {
            box += `
                <div class="col-md-3">
                    <div class="area-card cursor-pointer w-100 d-flex flex-column align-items-center text-white" id='${data.meals[i].strArea}'>
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data.meals[i].strArea}</h3>
                    </div>
                </div>
            `
        }
        $('section#area .container .row').html(box);
        $('section#area').removeClass('d-none')
    }

    showIngredients(data) {
        $('section').addClass('d-none');
        let box = ``;
        for (let i = 0; i < ((data.meals?.length ? data.meals.length : 0)); i++) {
            box += `
                <div class="col-md-3">
                    <div class="ingredient-card w-100 text-center text-white cursor-pointer" id='${data.meals[i].strIngredient}'>
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data.meals[i].strIngredient}</h3>
                        <p>${(data.meals[i].strDescription ? data.meals[i].strDescription : '').split(' ').slice(0, 20).toString().replaceAll(',', ' ')}</p>
                    </div>
                </div>
            `
        }
        $('section#ingredients .container .row').html(box);
        $('section#ingredients').removeClass('d-none');
    }

    showSide() {
        $('#showSideBtn').addClass('d-none');
        $('#hideSideBtn').removeClass('d-none');
        $('.aside-container').animate({ left: '0px' });
        $('.nav-links li').each(function (idx) {
            $(this).delay(100 * idx).animate({ top: `0px` })
        })
    }

    hideSide() {
        $('#showSideBtn').removeClass('d-none');
        $('#hideSideBtn').addClass('d-none');
        $('.nav-links li').each(function (idx) {
            $(this).animate({ top: `${$('.nav-links').outerHeight() + 50}px` })
        })
        $('.aside-container').animate({ left: `-${$('aside').outerWidth()}px` });
    }

    showDetails(meal) {
        $('section').addClass('d-none');
        let recipes = ``;
        for (let i = 0; i < meal.ingredients.length; i++) {
            recipes += `<li class="alert alert-info m-2 p-1">${meal.measures[i]} ${meal.ingredients[i]}</li>`
        }
        $('.recipes').html(recipes);
        $('.meal-instructions').html(meal.strInstructions)
        $('.meal-title').html(meal.strMeal)
        $('.meal-details-area').html(meal.strArea)
        $('.meal-details-category').html(meal.strCategory)
        $('.meal-details-thumbnail').attr('src', meal.strMealThumb);
        let tags = meal.strTags?.split(',');
        let tagsBox = ``;
        for (let i = 0; i < ((tags?.length) ? tags.length : 0); i++) {
            tagsBox += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        }
        $('.tags').html(tagsBox);
        $('.source-link').attr('href', meal.strSource);
        $('.youtube-link').attr('href', meal.strYoutube);
        $('#mealDetails').removeClass('d-none')
    }

    showLoader() {
        $('body').css({ height: '100vh', overflow: 'hidden' });
        $('.loader-container').show();
    }

    hideLoader() {
        $('body').css({ height: 'auto', overflow: 'unset' });
        $('.loader-container').hide();
    }
}