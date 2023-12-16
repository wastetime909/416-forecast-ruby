class WelcomeController < ApplicationController
  DAYS_BACK = 30
  def index
    @charges = populate_recent_charges(group_and_sum_charges)
    forecast = Prophet.forecast(@charges, count: 10).sort_by{ |key, _| key }
    @forecast = Hash[forecast.reverse]
  end

  private

  def group_and_sum_charges
    # Charge.group(:charged_on).sum(:amount)
    Charge.where("charged_on > ?", (DAYS_BACK + 2).days.ago).group(:charged_on).sum(:amount)
  end

  def populate_recent_charges(grouped_charges)
    {}.tap do |charges|
      Date.today.downto(Date.today - 30).each do |date|
        charges[date] = grouped_charges[date] || 0
      end
    end
  end
end
