Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  delete '/user/delete', to: 'users#destroy'
  resources :users, only: %i[create index show]
  resources :polls, only: %i[create index show destroy]
end
