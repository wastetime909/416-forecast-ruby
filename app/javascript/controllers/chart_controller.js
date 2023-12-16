import { Controller } from "@hotwired/stimulus"
import "chart.js"


// Connects to data-controller="chart"
export default class extends Controller {
  static values = {charges: String, forecast: String}
  connect() {
    this.setValuesForChart();
    this.displayChart();
  }

  setValuesForChart(){
    this.ctx = this.element.querySelector("canvas").getContext("2d")
    this.chargesArray = Object.entries(JSON.parse(this.chargesValue)).reverse()
    this.labels = this.chargesArray.map(item => item[0])
    this.amounts = this.chargesArray.map(item => item[1])

    this.forecastArray = Object.entries(JSON.parse(this.forecastValue)).reverse()
    this.forecastData = Array(this.amounts.length -1).fill(null)
    this.forecastData.push(this.amounts[this.amounts.length -1])
    this.forecastArray.map(([date, amount]) => {
      this.labels.push("Forecast" + date)
      this.forecastData.push(amount)
    })
  }
  displayChart(){
    new Chart(this.ctx, {
      type: "line",
      data:{
        labels: this.labels,
        datasets: [
          {label: "Amount", data: this.amounts, borderColor: "rgba(75, 192, 192, 1)"},
          {label: "Forecast", data: this.forecastData, borderColor: "rgba(255, 192, 192, 1)"}
        ]
      }
    })
  }
}
