//global config to make gh pages/local dev easier
var prefix = '/rcf-comediens/'

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
      {series: 0, date:"1761-04-08", anchorScroll:"joly-one", hoverText:"timeline.joly.one", fudged: false}, {series: 0, date:"1768-10-30", anchorScroll:"joly-two", hoverText:"timeline.joly.two", fudged: false}, {series: 0, date:"1781-03-28", anchorScroll:"joly-three", hoverText:"timeline.joly.three", fudged: false}, {series: 0, date:"1783-06-30", anchorScroll:"joly-four", hoverText:"timeline.joly.four", fudged: false}, {series: 0, date:"1784-09-21", anchorScroll:"joly-five", hoverText:"timeline.joly.five", fudged: false}, {series: 0, date:"1784-10-11", anchorScroll:"joly-six", hoverText:"timeline.joly.six", fudged: false}, {series: 0, date:"1784-10-11", anchorScroll:"joly-seven", hoverText:"timeline.joly.seven", fudged: false}, {series: 0, date:"1793-12-01", anchorScroll:"joly-eight", hoverText:"timeline.joly.eight", fudged: true}, {series: 0, date:"1798-01-01", anchorScroll:"joly-nine", hoverText:"timeline.joly.nine", fudged: true},
      //Bellecour
      {series: 1, date: "1725-01-16", anchorScroll: "bellecour-one", hoverText: "timeline.bellecour.one", fudged: false}, {series: 1, date: "1750-01-01", anchorScroll: "bellecour-two", hoverText: "timeline.bellecour.two", fudged: true}, {series: 1, date: "1769-02-19", anchorScroll: "bellecour-three", hoverText: "timeline.bellecour.three", fudged: false}, {series: 1, date: "1773-01-18", anchorScroll: "bellecour-four", hoverText: "timeline.bellecour.four", fudged: false}, {series: 1, date: "1775-01-01", anchorScroll: "bellecour-five", hoverText: "timeline.bellecour.five", fudged: true}, {series: 1, date: "1777-09-03", anchorScroll: "bellecour-six", hoverText: "timeline.bellecour.six", fudged: false}, {series: 1, date: "1778-02-09", anchorScroll: "bellecour-seven", hoverText: "timeline.bellecour.seven", fudged: false}, {series: 1, date: "1778-03-27", anchorScroll: "bellecour-eight", hoverText: "timeline.bellecour.eight", fudged: false}, {series: 1, date: "1770-06-01", anchorScroll: "bellecour-nine", hoverText: "timeline.bellecour.nine", fudged: true}, {series: 1, date: "1778-12-08", anchorScroll: "bellecour-ten", hoverText: "timeline.bellecour.ten", fudged: false},
      //Contat
      {series: 2, date: " 1760-06-17", anchorScroll:"contat-one", hoverText:"timeline.contat.one", fudged:false}, {series: 2, date: "1775-07-28", anchorScroll:"contat-two", hoverText:"timeline.contat.two", fudged: false }, {series: 2, date: "1776-04-07", anchorScroll:"contat-three", hoverText:"timeline.contat.three", fudged: false }, {series: 2, date: "1777-03-26", anchorScroll:"contat-four", hoverText:"timeline.contat.four", fudged: false }, {series: 2, date: "1780-04-18", anchorScroll:"contat-five", hoverText:"timeline.contat.five", fudged: false },  {series: 2, date: "1782-03-30", anchorScroll:"contat-six", hoverText:"timeline.contat.six", fudged:false}, {series: 2, date: "1783-04-23", anchorScroll:"contat-seven", hoverText:"timeline.contat.seven", fudged:false}, {series: 2, date: "1793-12-01", anchorScroll:"contat-eight", hoverText:"timeline.contat.eight", fudged:true}, {series: 2, date: "1793-02-13", anchorScroll:"contat-nine", hoverText:"timeline.contat.nine", fudged:false}, {series: 2, date: "1809-03-15", anchorScroll:"contat-ten", hoverText:"timeline.contat.ten", fudged: false }, {series: 2, date: "1813-04-19", anchorScroll:"contat-eleven", hoverText:"timeline.contat.eleven", fudged: false },
      //Molé
      {series: 3, date:"1734-11-24", anchorScroll:"mole-one", hoverText:"timeline.mole.one", fudged: false}, {series: 3, date:"1749-02-11", anchorScroll:"mole-two", hoverText:"timeline.mole.two", fudged:false}, {series: 3, date:"1754-10-07", anchorScroll:"mole-three", hoverText:"timeline.mole.three", fudged:false}, {series: 3, date:"1761-03-30", anchorScroll:"mole-four", hoverText:"timeline.mole.four", fudged:false}, {series: 3, date:"1769-10-04", anchorScroll:"mole-five", hoverText:"timeline.mole.five", fudged:false}, {series: 3, date:"1772-07-22", anchorScroll:"mole-six", hoverText:"timeline.mole.six", fudged: false}, {series: 3, date:"1773-01-20", anchorScroll:"mole-seven", hoverText:"timeline.mole.seven", fudged: false},
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
app.directive('timeLine', [ 'd3Service', '$translate', '$timeout', '$location', '$document', '$window',function(d3Service, $translate, $timeout, $location, $document, $window) {
  return {
    restrict: 'E',
    scope: {
      timelineData: '=',
      maxDate: '=',
      minDate: '='
    },
    translude: true,
    link: function(scope, element) {
      //timeline layout based on timekots plugin: https://github.com/alangrafu/timeknots/blob/master/src/timeknots.js

      //function for node click
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

      //preliminary data processing
      var max = Date.parse(scope.maxDate)
      var min = Date.parse(scope.minDate)


      var draw = function() {

        element.ready(function(){
          d3Service.d3().then(function(d3) {
            //get and set details
            let elem = element[0]
            let width = window.innerWidth - ((window.innerHeight/100)*60) ;
            let height = window.innerHeight * 0.8
            let indiv_height = Math.floor(height/6)

            //append svg
            let svg = d3.select('#timeline').append('svg').attr("width", width).attr("height", height)
            //figure out scale factors
            let radius = Math.floor(indiv_height/12);
            let line_width = radius * 0.9;
            let margin = (radius * 1.5) + line_width
            let step = (width-2*margin)/(max-min)
            let  series_data = [{link: "/joly", colour:"#f28e2b"}, {link: "/bellecour", colour: "#4e79a7"}, {link:"/contat", colour:"#ff9da7"}, {link:"/mole", colour:"#b07aa1"}, {link:"/vanhove-petit-talma", colour:"#59a14f"}, {link:"/preville", colour:"#edc948"}]

            //declare tooltip used for hover
            //TODO: maybe add max-width
            var tip = d3.select('#timeline')
              .append('div')
              .style("opacity", 0)
              .style("position", "absolute")
              .style("background","rgba(100, 100, 100, 0.5)")
              .style("color", "white")
              .style("padding", "5px 10px 5px 10px")
              .style("-moz-border-radius", "8px 8px")
              .style("border-radius", "8px 8px")
              .style("z-index", 999);

            //functions for x and y vals
            var xVal = function(date){
              let d = new Date(date).getTime()
              return step * (d - min) + margin
            }

            var yVal = function(index) {
              return index*indiv_height + indiv_height/2
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

              //draw lines
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
              //tip glitch happens when this doesn't fire -- look into it when it can be reproduced consistently
              .on("mouseover", function(d){
                //translate
                let langText = $translate.instant(d.hoverText)
                let formatDate = d.fudged? d.date.substr(0,4):d.date
                //append the tooltip
                d3.select(this)
                .style("fill", series_data[d.series].colour).transition()
                .duration(100).attr("r",  radius*1.75);
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
              //maybe apply this to the whole container so it doesn't get cut off?? Not sure it will work with d3
              svg.on("mousemove", function(){
              let mouse = d3.mouse(this)
              tipPixels = parseInt(tip.style("height").replace("px", ""));
              return tip.style("top", (mouse[1]-tipPixels-margin-radius)+"px").style("left",(mouse[0])+"px");})
              .on("mouseout", function(){return tip.style("opacity", 0).style("top","0px").style("left","0px");});

          });
        });
      }

      var onResize = function() {
          d3Service.d3().then(function(d3) {
            d3.select("#timeline").selectAll("*").remove();
            draw()
          });
      }

      angular.element($window).on('resize', function(e){
        $document.ready(function() {
          onResize()
        })
      });
      draw()
    }
  };
}]);
