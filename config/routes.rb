Rails.application.routes.draw do
  root 'pages#index'
  get '/login', to: 'sessions#new'
  delete '/logout', to: 'sessions#destroy'
  delete '/user/delete', to: 'users#destroy'
  resources :users, only: %i[create index show new]
  resources :polls, only: %i[create index show destroy new]
  resource :vote, only: [:create]
  resource :session, only: [:new, :create]
end
