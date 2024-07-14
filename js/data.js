export class Data {
    handleMealData(meal) {
        const ingredientsArr = [];
        const measuresArr = [];

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]?.trim();
            const measure = meal[`strMeasure${i}`]?.trim();

            if (ingredient) 
                ingredientsArr.push(ingredient);
            if (measure) 
                measuresArr.push(measure);

            delete meal[`strIngredient${i}`];
            delete meal[`strMeasure${i}`];
        }

        meal.ingredients = ingredientsArr;
        meal.measures = measuresArr;
        return meal;
    }

    async fetchAndHandleData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) 
                throw new Error('API response was not ok');
            const data = await response.json();
            if (data.meals) data.meals = data.meals.map(meal => this.handleMealData(meal));
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return { meals: [] };
        }
    }

    getMealsByName(name) {
        return this.fetchAndHandleData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    }

    getMealsByFLetter(letter) {
        return this.fetchAndHandleData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    }

    getMealByID(id) {
        return this.fetchAndHandleData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    }

    getMealsByCategory(category) {
        return this.fetchAndHandleData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    }

    getMealsByArea(area) {
        return this.fetchAndHandleData(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    }

    getMealsByIngredient(ingredient) {
        return this.fetchAndHandleData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    }

    async getCategories() {
        return this.fetchAndHandleData('https://www.themealdb.com/api/json/v1/1/categories.php');
    }

    async getAreas() {
        return this.fetchAndHandleData('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    }

    async getIngredients() {
        return this.fetchAndHandleData('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    }
}
