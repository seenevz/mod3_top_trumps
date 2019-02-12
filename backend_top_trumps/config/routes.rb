Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/game'

  resources :cards, only: [:index, :show]
  resources :users, only: [:index, :show, :create]
  resources :games, only: [:index, :show, :create]
end
