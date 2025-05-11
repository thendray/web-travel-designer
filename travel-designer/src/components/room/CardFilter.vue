<template>
    <div class="filters-container">
      <div class="filter-item search-box">
        <input 
          type="text" 
          v-model="filters.name" 
          placeholder="Поиск по названию" 
          @input="applyFilters"
        >
        <i class="fas fa-search"></i>
      </div>
  
      <div class="filter-item rating-filter">
        <select v-model="filters.rating" @change="applyFilters">
          <option value="">Рейтинг</option>
          <option value="5">Определен</option>
          <option value="4">3+</option>
          <option value="3">5+</option>
          <option value="2">7+</option>
          <option value="1">9+</option>
        </select>
      </div>
  
      <div class="filter-item category-filter">
        <div class="multiselect-wrapper" @click.stop="toggleCategoryDropdown">
          <div class="multiselect-selected">
            <span v-if="selectedCategories.length === 0">Категории</span>
            <span v-else>{{ selectedCategories.length }} выбрано</span>
            <i :class="['fas', categoryDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
          </div>
          <div v-show="categoryDropdownOpen" class="multiselect-dropdown" @click.stop>
            <div 
              v-for="(category, index) in categories" 
              :key="index"
              class="multiselect-option"
            >
              <label>
                <input 
                  type="checkbox" 
                  v-model="filters.categories" 
                  :value="category.value" 
                  @change="applyFilters"
                >
                {{ category.label }}
              </label>
            </div>
          </div>
        </div>
      </div>
  
      <div class="filter-item">
        <button class="reset-btn" @click="resetFilters">
          <i class="fas fa-undo"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardFilters',
    
    props: {
      cards: {
        type: Array,
        required: true
      }
    },
    
    data() {
      return {
        filters: {
          name: '',
          rating: '',
          categories: []
        },
        
        categoryDropdownOpen: false,
        
        categories: [
          { value: 'bed', label: 'Отели' },
          { value: 'food', label: 'Еда' },
          { value: 'entertainment', label: 'Развлечения' },
          { value: 'question', label: 'Другое' }
        ],
        
        filteredCards: []
      }
    },
    
    computed: {
      selectedCategories() {
        return this.filters.categories;
      }
    },
    created() {
      this.filteredCards = [...this.cards];
      document.addEventListener('click', this.closeCategoryDropdown);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.closeCategoryDropdown);
    },
    methods: {
      toggleCategoryDropdown() {
        this.categoryDropdownOpen = !this.categoryDropdownOpen;
      },
      closeCategoryDropdown() {
        this.categoryDropdownOpen = false;
      },
      applyFilters() {
        let result = [...this.cards];
        
        if (this.filters.name) {
          const searchTerm = this.filters.name.toLowerCase();
          result = result.filter(card => 
            card.name.toLowerCase().includes(searchTerm)
          );
        }
        
        if (this.filters.rating) {
          var filter;
          if (this.filters.rating == "5") {
            filter = (card) => card.rating != "..."; 
          } else if (this.filters.rating == "4") {
            filter = (card) => parseFloat(card.rating) >= 3;
          } else if (this.filters.rating == "3") {
            filter = (card) => parseFloat(card.rating) >= 5;
          } else if (this.filters.rating == "2") {
            filter = (card) => parseFloat(card.rating) >= 7;
          } else if (this.filters.rating == "1") {
            filter = (card) => parseFloat(card.rating) >= 9;
          } else {
            filter = () => true; 
          }

          result = result.filter(filter);
        }
        
        if (this.filters.categories.length > 0) {
          result = result.filter(card => 
            this.filters.categories.includes(card.category)
          );
        }
        
        this.filteredCards = result;
        console.log('filtered', this.filteredCards.map(c => c.name));
        this.$emit('filtered', this.filteredCards);
      },
      
      resetFilters() {
        this.filters = {
          name: '',
          rating: '',
          categories: []
        };
        this.filteredCards = [...this.cards];
        this.$emit('filtered', this.filteredCards);
      }
    }
  }
  </script>
  
  <style scoped>
  .filters-container {
    display: flex;
    align-items: center;
    background-color: rgba(238, 249, 231, 0.7);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    padding: 12px 16px;
    margin-bottom: 10px;
    gap: 10px;
    flex-wrap: nowrap;
    position: relative;
  }
  
  .filter-item {
    /* flex: 1; */
    /* min-width: 120px; */
    border-radius: 8px;
  }
  
  .search-box {
    position: relative;
    flex: 2;
  }
  
  .search-box input {
    width: 100%;
    padding: 10px 16px 10px 36px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    transition: border 0.2s ease;
  }
  
  .search-box input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(197, 255, 134, 0.1);
  }
  
  .search-box i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9e9e9e;
  }
  
  .rating-filter select {
    width: 100%;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239e9e9e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
    cursor: pointer;
  }
  
  .rating-filter select:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(197, 255, 134, 0.1);
  }
  
  .multiselect-wrapper {
    position: relative;
    width: 100%;
  }
  
  .multiselect-selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    background-color: #fff;
  }
  
  .multiselect-selected:hover {
    border-color: #bdbdbd;
  }
  
  .multiselect-dropdown {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: rgb(255, 255, 255);
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  
  .multiselect-option {
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .multiselect-option:hover {
    background-color: #f5f5f5;
  }
  
  .multiselect-option label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .multiselect-option input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: rgb(151, 241, 152);
  }
  
  .reset-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 16px;
    background-color: rgb(245, 245, 245);
    border: 1px solid rgb(224, 224, 224);
    border-radius: 6px;
    font-size: 14px;
    color: rgb(97, 97, 97);
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
  }
  
  .reset-btn:hover {
    background-color: #eeeeee;
    color: #424242;
  }
  
  .reset-btn:active {
    transform: translateY(1px);
  }
  
  @media (max-width: 768px) {
    .filters-container {
      flex-wrap: wrap;
      gap: 12px;
    }
    
    .filter-item {
      flex: 1 1 calc(50% - 12px);
      min-width: 0;
    }
    
    .search-box {
      flex: 1 1 100%;
    }
  }
  </style>
  