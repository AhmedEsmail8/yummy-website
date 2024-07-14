import { Data } from "./data.js";
import { FormValidation } from "./formValidation.js";
import { Ui } from "./ui.js";


const ui = new Ui()
const data = new Data()
const formValidation = new FormValidation();

$(document).ready(async function () {
    ui.showLoader();
    ui.displayMeals($('#meals .container .row'), await data.getMealsByName(''));
    getMealCardEvent();
    ui.hideLoader()
})

$('.nav-links a').click(async function () {
    ui.hideSide();
    switch ($(this).attr('data-target')) {
        case 'search':
            $('section').addClass('d-none');
            $('section#search').removeClass('d-none');
            break;

        case 'categories':
            ui.showLoader();
            ui.displayCategories(await data.getCategories())
            getCategoryCardEvent();
            ui.hideLoader()
            break;

        case 'area':
            ui.showLoader();
            const area = await data.getAreas();
            ui.showAreas(area);
            getAreaCardEvent();
            ui.hideLoader()
            break;

        case 'ingredients':
            ui.showLoader();
            const ingredients = await data.getIngredients();
            ui.showIngredients(ingredients);
            getIngredientsCardEvent();
            ui.hideLoader()
            break;

        case 'contact':
            $('section').addClass('d-none');
            $('section#contact').removeClass('d-none');
            break;
    }
})

$('input#searchByName').on('input', async function () {
    $('input#searchByFirstLetter').val('')
    ui.displayMeals($('section#search .container .meals-container'), await data.getMealsByName($(this).val()))
    getMealCardEvent();
})

$('input#searchByFirstLetter').on('input', async function () {
    $('input#searchByName').val('');
    if ($(this).val().length > 1)
        $(this).val($(this).val().substring(0, 1));
    ui.displayMeals($('section#search .container .meals-container'), await data.getMealsByFLetter($(this).val()))
    getMealCardEvent();
})

$('.aside-container').css({ left: `-${$('aside').outerWidth()}px` })
$('.nav-links li').each(function (idx) {
    $(this).css({ top: `${$('.nav-links').outerHeight() + 50}px` })
})

$('#showSideBtn').on('click', ui.showSide)
$('#hideSideBtn').on('click', ui.hideSide)

$('#name').on('input', formValidation.validateName);
$('#email').on('input', formValidation.validateEmail);
$('#phone').on('input', formValidation.validatePhone);
$('#age').on('input', formValidation.validateAge);
$('#password').on('input', formValidation.validatePassword);
$('#repassword').on('input', formValidation.validateRepassword);

function getMealCardEvent(){
    $('.meal-card').click(async function () {
        ui.showLoader();
        const mealDetails = await data.getMealByID($(this).attr('id'));
        ui.showDetails(mealDetails.meals[0]);
        ui.hideLoader()
    })
}

function getIngredientsCardEvent(){
    $('.ingredient-card').click(async function () {
        ui.showLoader();
        const selectedIngredient = $(this).attr('id');
        const ingredientMeals = await data.getMealsByIngredient(selectedIngredient);
        ui.displayMeals($('#meals .container .row'), ingredientMeals);
        ui.hideLoader()
        getMealCardEvent();
    })
}

function getAreaCardEvent(){
    $('.area-card').click(async function () {
        ui.showLoader();
        const selectedArea = $(this).attr('id');
        const areaMeals = await data.getMealsByArea(selectedArea);
        ui.displayMeals($('#meals .container .row'), areaMeals);
        ui.hideLoader()
        getMealCardEvent();
    })
}

function getCategoryCardEvent(){
    $('.category-card').click(async function () {
        ui.showLoader();
        const categoryMeals = await data.getMealsByCategory($(this).attr('id'));
        ui.displayMeals($('#meals .container .row'), categoryMeals);
        ui.hideLoader()
        getMealCardEvent();
    })
}