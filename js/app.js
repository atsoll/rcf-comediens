//global config to make gh pages/local dev easier
var prefix = './'

//d3 integration taken from http://www.ng-newsletter.com.s3-website-us-east-1.amazonaws.com/posts/d3-on-angular.html
angular.module('d3', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = prefix + 'js/d3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      }
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };
}]);


var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'pascalprecht.translate', 'd3', 'duScroll']);

app.config(function($routeProvider) {
    //prefix var just to make switching between local dev and gh pages easier
    let prefix = "./"
    $routeProvider
    .when("/", {
        templateUrl : prefix + "views/home.html"
    })
    .when("/joly", {
        templateUrl : prefix + "views/joly.html"
    })
    .when("/contat", {
        templateUrl : prefix + "views/contat.html"
    })
    .when("/mole", {
        templateUrl : prefix + "views/mole.html"
    })
    .when("/preville", {
        templateUrl : prefix + "views/preville.html"
    })
    .when("/vanhove-petit-talma", {
        templateUrl : prefix + "views/vanhove-petit-talma.html"
    })
    .when("/bellecour", {
        templateUrl : prefix + "views/bellecour.html"
    })

});

app.config(function ($translateProvider) {
    $translateProvider
    .useStaticFilesLoader({
        prefix: prefix + 'locales/locale-',
        suffix: '.json'
    })
    .useSanitizeValueStrategy('sanitizeParameters')
    .preferredLanguage('fr');
});


app.controller('ctrl', function($scope, $window, $uibModal, $translate) {
  $scope.model = {
    lang: 'fr',
    entities: {
      hommes: [{pseudo: "Bellecour", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/135push1718_Bellecour.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/bellecour", colour: "#4e79a7", link: "#!bellecour"},
               {pseudo: "Molé", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/144push1718_Mole.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/francois-rene-mole", colour: "#b07aa1", link: "#!mole"},
               {pseudo: "Préville", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/137push1718_Preville.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/preville", colour: "#edc948",  link: "#!preville"}],
      femmes: [{pseudo: "Joly", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/182push1718_MlleJoly.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/marie-elisabeth-joly", colour: "#f28e2b",  link: "#!joly"},
               {pseudo: "Contat", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/171push1718_MlleContat.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/louise-contat", colour: "#ff9da7",  link: "#!contat"},
               {pseudo: "Vanhove-Petit-Talma", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/187push1718_MmeTalma.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/caroline-talma", colour: "#59a14f",  link: "#!vanhove-petit-talma"}]
    },
    curr:null,
    //fudged variable used to flag dates that are only years
    timeline_data: [
      //Joly
      {series: 0, date:"1761-04-08", anchorScroll:"joly-one", hoverText:"timeline.joly.one", fudged: false}, {series: 0, date:"1768-10-30", anchorScroll:"joly-two", hoverText:"timeline.joly.two", fudged: false},
      //Bellecour
      {series: 1, date: "1725-01-16", anchorScroll: null, hoverText: "timeline.bellecour.one", fudged: false}, {series: 1, date: "1750-01-01", anchorScroll: null, hoverText: "timeline.bellecour.two", fudged: true},
      //Contat
      {series: 2, date: "1760-01-01", anchorScroll:null, hoverText:"", fudged:true}, {series: 2, date: "1775-07-28", anchorScroll:null, hoverText:"", fudged: false },
      //Molé
      {series: 3, date:"1734-11-24", anchorScroll:null, hoverText:"", fudged: false}, {series: 3, date:"1749-02-11", anchorScroll:null, hoverText:"", fudged:false},
      //VPT
      {series: 4, date:"1777-11-29" , anchorScroll:null, hoverText:"", fudged: false}, { series: 4, date: "1785-01-01", anchorScroll: null, hoverText:"", fudged: true},
      //Préville
      {series: 5, date: "1721-01-01", anchorScroll:null, hoverText:"", fudged: true}, { series: 5, date: "1738-01-01", anchorScroll:null, hoverText:"", fudged: true},
    ]

  }

  $scope.changeLang = function(l) {
    $scope.model.lang = l;
    $translate.use(l);
  }

  $scope.openModal = function(url) {
    $scope.model.modalInstance = $uibModal.open({
       templateUrl: url,
       scope: $scope
     });
  }

  $scope.closeModal = function() {
    $scope.model.modalInstance.close();
  }

  $scope.$on('$locationChangeSuccess', function(event, toState){
    let target = toState.split('!/')[1]
    if(target) {
      let h = $scope.model.entities.hommes.filter(function(s){return s.pseudo.toLowerCase()==target})[0]
      let f =  $scope.model.entities.femmes.filter(function(s){return s.pseudo.toLowerCase()==target})[0]
      $scope.model.curr = f? f: h
    }
  });

  //for point filling in as you scroll
  //TODO: deal with bottom most points
  $(window).on('scroll', function() {
    $('.timepoint').each(function() {
        var id = $(this).attr('id');
        //the premptive offset is a bit arbitrary
        if($(this).offset().top - 115 <= $(window).scrollTop()) {
              document.querySelectorAll("div.timeline-point[section='" + id + "']")[0].style.background = $scope.model.curr.colour;
        }
        else {
          document.querySelectorAll("div.timeline-point[section='" + id + "']")[0].style.background = '#fff';
        }
    });
  });

});
//TODO: trigger redraw on resize
app.directive('timeLine', [ 'd3Service', '$translate', '$timeout', '$location', '$document', function(d3Service, $translate, $timeout, $location, $document) {
  return {
    restrict: 'E',
    scope: {
      timelineData: '=',
      maxDate: '=',
      minDate: '='
    },
    translude: true,
    link: function(scope, element) {
      //timeline layour based on timekots plugin: https://github.com/alangrafu/timeknots/blob/master/src/timeknots.js
      element.ready(function(){
        d3Service.d3().then(function(d3) {
          //get and set details
          elem = element[0]
          var width = elem.offsetWidth;
          var height = window.innerHeight * 0.8
          var indiv_height = Math.floor(height/6)
          //append svg
          var svg = d3.select('#timeline').append('svg').attr("width", width).attr("height", height)
          //figure out scale factors
          var max = Date.parse(scope.maxDate)
          var min = Date.parse(scope.minDate)

          //globals
          var radius = Math.floor(indiv_height/12);
          var line_width = radius * 0.9;
          var margin = (radius * 1.5) + line_width
          var step = (width-2*margin)/(max-min)
          var series_data = [{link: "/joly", colour:"#f28e2b"}, {link: "/bellecour", colour: "#4e79a7"}, {link:"/contat", colour:"#ff9da7"}, {link:"/mole", colour:"#b07aa1"}, {link:"/vanhove-petit-talma", colour:"#59a14f"}, {link:"/preville", colour:"#edc948"}]

          //declaree tooltip used for hover
          //TODO: maybe add max-width
          var tip = d3.select('#timeline')
            .append('div')
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background","rgba(100, 100, 100, 0.5)")
            .style("color", "white")
            .style("padding", "5px 10px 5px 10px")
            .style("-moz-border-radius", "8px 8px")
            .style("border-radius", "8px 8px");

          //functions for x and y vals
          var xVal = function(date){
            let d = new Date(date).getTime()
            return step * (d - min) + margin
          }

          var yVal = function(index) {
            return index*indiv_height + indiv_height/2
          }

          //scroll function for onclick
          var enterAndScroll = function(link, anchor) {
            $location.path(link);
            scope.$apply()
            if(anchor) {
              $timeout( function(){
                var someElement = document.getElementById(anchor);
                $document.duScrollToElementAnimated(someElement);
              }, 200 );
            }
          }

          /*draw the lines
            don't necessarily need to sort but just to be safe
            not very efficient but better than brute forcing the combinatorics*/
          scope.timelineDate = scope.timelineData.sort(function(a, b) {
              return a.series - b.series || xVal(a.date) - xVal(b.date)
          });

          let pairs = []
          //relies on the prior sorting
          for(let i=0;i<scope.timelineData.length-1;i++) {
            if(scope.timelineData[i].series==scope.timelineData[i+1].series) {
              let yValue = yVal(scope.timelineData[i].series)
              pairs.push({data:[{x: xVal(scope.timelineData[i].date), y: yValue}, {x: xVal(scope.timelineData[i+1].date), y:yValue}], colour: series_data[scope.timelineData[i].series].colour})
            }
          }


            svg.selectAll("line")
             .data(pairs)
             .enter()
             .append("line")
             .attr("x1", function(d){return d.data[0].x})
             .attr("y1", function(d){return d.data[0].y})
             .attr("x2", function(d){return d.data[1].x})
             .attr("y2", function(d){return d.data[1].y})
             .style("stroke", function(d){return d.colour})
             .style("stroke-width", line_width);


          //draw the dots
          svg.selectAll('circle')
            .data(scope.timelineData).enter().append('circle')
            .attr("class", "timeline-event")
            .attr("r", radius )
            .style("stroke", function(d){
              return series_data[d.series].colour
            })
            .style("stroke-width", Math.floor(line_width/2))
            .style("fill", "#fff")
            .attr("cy", function(d){
              return yVal(d.series)
            })
            .attr("cx", function(d){
              return xVal(d.date)
            })
            .on("mouseover", function(d){
              //translate
              let langText = $translate.instant(d.hoverText)
              let formatDate = d.fudged? d.date.substr(0,4):d.date
              //append the tooltip
              d3.select(this)
              .style("fill", 'rgb(255,0,0)').transition()
              .duration(100).attr("r",  radius*1.5);
              tip.html("");
              tip.append("div").style("float", "left").html('<b>' + formatDate  + '</b>');
              tip.append("div").html('<br/><p>' + langText+ '</p>')
              tip.transition()
              .duration(100)
              .style("opacity", .9);

            })
            .on("mouseout", function(){
              d3.select(this)
              .style("fill", '#fff').transition()
              .duration(100).attr("r", radius);
              tip.transition()
              .duration(100)
              .style("opacity", 0)
            })
            .on('click', function(d){
              enterAndScroll(series_data[d.series].link, d.anchorScroll)
            });

            //properly position the tooltip
            svg.on("mousemove", function(){
            tipPixels = parseInt(tip.style("height").replace("px", ""));
            return tip.style("top", (d3.event.pageY-tipPixels-margin-3.5*radius)+"px").style("left",(d3.event.pageX-width* 0.25)+"px");})
            .on("mouseout", function(){return tip.style("opacity", 0).style("top","0px").style("left","0px");});

        });
      });
    }
  };
}]);
