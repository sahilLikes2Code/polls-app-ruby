Rails.application.routes.draw do
  root 'polls#index'
  resources :users, only: %i[create index show new]
  resources :polls, only: %i[create index show destroy new]
  resource :vote, only: [:create]
  resource :session, only: [:new, :create]
  get '/login', to: 'sessions#new'
  delete '/logout', to: 'sessions#destroy'
  delete '/user/delete', to: 'users#destroy'
  # resources :sessions, only: %i[create destroy]
  # get 'votes/create'
  # get '/signup', to: 'users#new'
  get '/logout', to: 'sessions#destroy'
  # post '/polls/:id/vote', to: 'votes#create'
end
