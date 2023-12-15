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
    console.log(this.labels)
  }
  displayChart(){
    new Chart(this.ctx, {
      type: "line",
      data:{
        labels: this.labels,
        datasets: [
          {label: "Amount", data: this.amounts, borderColor: "rgba(75, 192, 192, 1)"}
        ]
      }
    })
  }
}
