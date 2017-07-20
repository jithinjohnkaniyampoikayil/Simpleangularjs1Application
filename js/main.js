/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute','kendo.directives'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */$scope) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
      
  $scope.mainGridOptions = {
      dataSource: {
          type: "odata",
          transport: {
              read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
          },
          pageSize: 5,
          serverPaging: true,
          serverSorting: true
      },
      sortable: true,
      pageable: true,
      dataBound: function() {
          this.expandRow(this.tbody.find("tr.k-master-row").first());
      },
      columns: [{
          field: "FirstName",
          title: "First Name",
          width: "120px"
          },{
          field: "LastName",
          title: "Last Name",
          width: "120px"
          },{
          field: "Country",
          width: "120px"
          },{
          field: "City",
          width: "120px"
          },{
          field: "Title"
      }]
  };

  $scope.detailGridOptions = function(dataItem) {
      return {
          dataSource: {
              type: "odata",
              transport: {
                  read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 5,
              filter: { field: "EmployeeID", operator: "eq", value: dataItem.EmployeeID }
          },
          scrollable: false,
          sortable: true,
          pageable: true,
          columns: [
          { field: "OrderID", title:"ID", width: "56px" },
          { field: "ShipCountry", title:"Ship Country", width: "110px" },
          { field: "ShipAddress", title:"Ship Address" },
          { field: "ShipName", title: "Ship Name", width: "190px" }
          ]
      };
  };
       
});