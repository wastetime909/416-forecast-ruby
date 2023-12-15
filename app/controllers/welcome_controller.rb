class WelcomeController < ApplicationController
  def index
    @charges = populate_recent_charges(group_and_sum_charges)
  end

  private

  def group_and_sum_charges
    Charge.group(:charged_on).sum(:amount)
  end

  def populate_recent_charges(grouped_charges)
    {}.tap do |charges|
      Date.today.downto(Date.today - 30).each do |date|
        charges[date] = grouped_charges[date] || 0
      end
    end
  end
end
