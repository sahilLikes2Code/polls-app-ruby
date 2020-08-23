Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get "test", to: "sessions#is_logged_in?"
  resources :users, only: %i[create show index]
  resources :sessions, only: %i[create destroy]
end
