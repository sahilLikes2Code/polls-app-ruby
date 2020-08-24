Rails.application.routes.draw do
  root 'polls#index'
  resources :users, only: %i[create index show]
  resources :polls, only: %i[create index show destroy]
  resource :vote, only: [:create]
  get 'votes/create'
  # Fixme, nextline
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  delete '/user/delete', to: 'users#destroy'
  # post '/polls/:id/vote', to: 'votes#create'
end
