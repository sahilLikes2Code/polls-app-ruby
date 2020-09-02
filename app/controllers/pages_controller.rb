class PagesController < ApplicationController
  def index
    if logged_in?
      current_user
    end
    @polls = Poll.all
    
  end
end
