//global config to make gh pages/local dev easier
var prefix =  '/rcf-comediens/'
//for scale
var vh = window.innerHeight/100;


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


var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'pascalprecht.translate', 'd3', 'duScroll', 'ezplus', 'slickCarousel']);
app.value('duScrollDuration', 1500);

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


app.controller('ctrl', function($scope, $window, $uibModal, $translate, $document) {

  //for pretty transitions
  this.$onInit = function () {
    AOS.init();
  }

  $scope.model = {
    lang: 'fr',
    entities: {
      hommes: [{pseudo: "Bellecour", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/135push1718_Bellecour.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/bellecour", colour: "#4e79a7", link: "#!bellecour", signature:prefix + "style/img/bellecour/signature.png"},
               {pseudo: "Molé", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/144push1718_Mole.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/francois-rene-mole", colour: "#b07aa1", link: "#!mole", signature:prefix + "style/img/mole/signature.png"},
               {pseudo: "Préville", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/137push1718_Preville.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/preville", colour: "#edc948",  link: "#!preville", signature:prefix + "style/img/preville/signature.png"}],
      femmes: [{pseudo: "Joly", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/182push1718_MlleJoly.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/marie-elisabeth-joly", colour: "#f28e2b",  link: "#!joly", signature:prefix + "style/img/joly/signature.png"},
               {pseudo: "Contat", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/171push1718_MlleContat.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/louise-contat", colour: "#ff9da7",  link: "#!contat", signature:prefix + "style/img/contat/signature.png"},
               {pseudo: "Vanhove-Petit-Talma", img_src:"https://www.comedie-francaise.fr/www/comedie/cache/media/square_w400_h500/187push1718_MmeTalma.jpg", cf_link:"https://www.comedie-francaise.fr/fr/artiste/caroline-talma", colour: "#59a14f",  link: "#!vanhove-petit-talma", signature:prefix + "style/img/vpt/signature.png"}]
    },
    curr:null,
    //fudged variable used to flag dates that are only years
    timeline_data: [
      //Joly
      {series: 0, date:"1761.04.08", anchorScroll:"joly-naissance", hoverText:"timeline.joly.naissance", fudged: false}, {series: 0, date:"1768.10.30", anchorScroll:"joly-enfant", hoverText:"timeline.joly.enfant", fudged: false},{series: 0, date:"1769.06.01", anchorScroll:"joly-roles", hoverText:"timeline.joly.roles", fudged: true}, {series: 0, date:"1781.03.28", anchorScroll:"joly-debut", hoverText:"timeline.joly.debut", fudged: false},{series: 0, date:"1781.03.30", anchorScroll:"joly-reception", hoverText:"timeline.joly.reception", fudged: false}, {series: 0, date:"1781.05.21", anchorScroll:"joly-essai", hoverText:"timeline.joly.essai", fudged: false}, {series: 0, date:"1783.06.01", anchorScroll:"joly-refus", hoverText:"timeline.joly.refus", fudged: true}, {series: 0, date:"1783.06.30", anchorScroll:"joly-augmentation", hoverText:"timeline.joly.augmentation", fudged: false}, {series: 0, date:"1784.09.21", anchorScroll:"joly-suspension", hoverText:"timeline.joly.suspension", fudged: false}, {series: 0, date:"1784.10.11", anchorScroll:"joly-replique", hoverText:"timeline.joly.replique", fudged: false}, {series: 0, date:"1793.10.07", anchorScroll:"joly-prison", hoverText:"timeline.joly.prison", fudged: false}, {series: 0, date:"1798.05.05", anchorScroll:"joly-mort", hoverText:"timeline.joly.mort", fudged: false}, {series: 0, date:"1815.04.11", anchorScroll:"joly-filles-1", hoverText:"timeline.joly.filles-1", fudged: false}, {series: 0, date:"1815.05.18", anchorScroll:"joly-filles-2", hoverText:"timeline.joly.filles-2", fudged: false}, {series: 0, date:"1823.04.14", anchorScroll:"joly-filles-3", hoverText:"timeline.joly.filles-3", fudged: false}, {series: 0, date:"1825.05.10", anchorScroll:"joly-filles-4", hoverText:"timeline.joly.filles-4", fudged: false}, {series: 0, date:"1828.05.12", anchorScroll:"joly-gratis", hoverText:"timeline.joly.gratis", fudged: false},
      //Bellecour
      {series: 1, date: "1725.01.16", anchorScroll: "bellecour-naissance", hoverText: "timeline.bellecour.naissance", fudged: false}, {series: 1, date: "1751.11.02", anchorScroll: "bellecour-reception", hoverText: "timeline.bellecour.reception", fudged: false}, {series: 1, date: "1756.01.01", anchorScroll: "bellecour-roles", hoverText: "timeline.bellecour.roles", fudged: true}, {series: 1, date: "1769.02.19", anchorScroll: "bellecour-retraite", hoverText: "timeline.bellecour.retraite", fudged: false}, {series: 1, date: "1773.01.18", anchorScroll: "bellecour-sante", hoverText: "timeline.bellecour.sante", fudged: false}, {series: 1, date: "1773.12.13", anchorScroll: "bellecour-repertoire", hoverText: "timeline.bellecour.repertoire", fudged: false}, {series:1, date:"1775.01.01", anchorScroll: "bellecour-mediateur", hoverText: "timeline.bellecour.mediateur", fudged: true}, {series: 1, date: "1777.09.03", anchorScroll: "bellecour-pensions", hoverText: "timeline.bellecour.pensions", fudged: false}, {series: 1, date: "1778.02.09", anchorScroll: "bellecour-lekain", hoverText: "timeline.bellecour.lekain", fudged: false}, {series: 1, date: "1778.03.27", anchorScroll: "bellecour-cour", hoverText: "timeline.bellecour.cour", fudged: false}, {series: 1, date: "1778.06.01", anchorScroll: "bellecour-malheur", hoverText: "timeline.bellecour.malheur", fudged: true}, {series: 1, date: "1778.12.08", anchorScroll: "bellecour-mort", hoverText: "timeline.bellecour.mort", fudged: false},
      //Contat
      {series: 2, date: " 1760.06.17", anchorScroll:"contat-naissance", hoverText:"timeline.contat.naissance", fudged:false}, {series: 2, date: "1775.07.28", anchorScroll:"contat-debut", hoverText:"timeline.contat.debut", fudged: false }, {series: 2, date: "1776.04.07", anchorScroll:"contat-quart", hoverText:"timeline.contat.quart", fudged: false }, {series: 2, date: "1777.03.26", anchorScroll:"contat-demi", hoverText:"timeline.contat.demi", fudged: false }, {series: 2, date: "1780.04.18", anchorScroll:"contat-trois-quarts", hoverText:"timeline.contat.trois-quarts", fudged: false },  {series: 2, date: "1782.03.30", anchorScroll:"contat-grossesse", hoverText:"timeline.contat.grossesse", fudged:false}, {series: 2, date: "1783.04.23", anchorScroll:"contat-entiere", hoverText:"timeline.contat.entiere", fudged:false}, {series: 2, date: "1793.12.01", anchorScroll:"contat-amour", hoverText:"timeline.contat.amour", fudged:true}, {series: 2, date: "1793.02.13", anchorScroll:"contat-prison", hoverText:"timeline.contat.prison", fudged:false}, {series: 2, date: "1809.01.01", anchorScroll:"contat-retraite", hoverText:"timeline.contat.retraite", fudged: true }, {series: 2, date: "1809.03.15", anchorScroll:"contat-benefice", hoverText:"timeline.contat.benefice", fudged: false }, {series: 2, date: "1813.04.19", anchorScroll:"contat-mort", hoverText:"timeline.contat.mort", fudged: false },
      //Molé
      {series: 3, date:"1734.11.24", anchorScroll:"mole-naissance", hoverText:"timeline.mole.naissance", fudged: false}, {series: 3, date:"1749.02.11", anchorScroll:"mole-pere", hoverText:"timeline.mole.pere", fudged:false}, {series: 3, date:"1754.10.07", anchorScroll:"mole-debut", hoverText:"timeline.mole.debut", fudged:false}, {series: 3, date:"1761.03.30", anchorScroll:"mole-societariat", hoverText:"timeline.mole.societariat", fudged:false}, {series: 3, date:"1769.01.10", anchorScroll:"mole-mariage", hoverText:"timeline.mole.mariage", fudged: false}, {series: 3, date:"1769.10.04", anchorScroll:"mole-hamlet", hoverText:"timeline.mole.hamlet", fudged:false}, {series: 3, date:"1773.01.20", anchorScroll:"mole-malade", hoverText:"timeline.mole.malade", fudged: false}, {series: 3, date:"1774.02.12", anchorScroll:"mole-absence", hoverText:"timeline.mole.absence", fudged: false}, {series: 3, date:"1778.01.01", anchorScroll:"mole-specialisation", hoverText:"timeline.mole.specialisation", fudged: true}, {series: 3, date:"1785.12.01", anchorScroll:"mole-eleve", hoverText:"timeline.mole.eleve", fudged: false}, {series: 3, date:"1791.02.15", anchorScroll:"mole-tensions", hoverText:"timeline.mole.tensions", fudged: false}, {series: 3, date:"1791.12.08", anchorScroll:"mole-regles", hoverText:"timeline.mole.regles", fudged: false}, {series: 3, date:"1793.03.19", anchorScroll:"mole-retour", hoverText:"timeline.mole.retour", fudged: false}, {series: 3, date:"1793.07.15", anchorScroll:"mole-pension", hoverText:"timeline.mole.pension", fudged: false}, {series: 3, date:"1796.06.25", anchorScroll:"mole-passeport", hoverText:"timeline.mole.passeport", fudged: false}, {series: 3, date:"1799.03.30", anchorScroll:"mole-vacances", hoverText:"timeline.mole.vacances", fudged: false}, {series: 3, date:"1802.12.11", anchorScroll:"mole-mort", hoverText:"timeline.mole.mort", fudged: false},
      //VPT
      {series: 4, date:"1771.01.01" , anchorScroll:"vpt-naissance", hoverText:"timeline.vpt.naissance", fudged: true}, {series: 4, date:"1777.11.29" , anchorScroll:"vpt-enfant", hoverText:"timeline.vpt.enfant", fudged: false}, { series: 4, date: "1785.01.01", anchorScroll: "vpt-debut", hoverText:"timeline.vpt.debut", fudged: true},{ series: 4, date: "1786.01.01", anchorScroll: "vpt-petit", hoverText:"timeline.vpt.petit", fudged: true}, { series: 4, date: "1789.12.02", anchorScroll: "vpt-reception", hoverText:"timeline.vpt.reception", fudged: false}, { series: 4, date: "1789.12.14", anchorScroll: "vpt-olivier", hoverText:"timeline.vpt.olivier", fudged: false}, { series: 4, date: "1791.05.02", anchorScroll: "vpt-fleury", hoverText:"timeline.vpt.fleury", fudged: false}, { series: 4, date: "1802.01.01", anchorScroll: "vpt-talma", hoverText:"timeline.vpt.talma", fudged: true},{ series: 4, date: "1811.01.01", anchorScroll: "vpt-retraite", hoverText:"timeline.vpt.retraite", fudged: true}, { series: 4, date: "1828.01.01", anchorScroll: "vpt-comte", hoverText:"timeline.vpt.comte", fudged: true}, { series: 4, date: "1860.04.11", anchorScroll: "vpt-mort", hoverText:"timeline.vpt.mort", fudged: false},
      //Préville
      {series: 5, date: "1721.11.17", anchorScroll:"preville-naissance", hoverText:"timeline.preville.naissance", fudged: false}, { series: 5, date: "1738.01.01", anchorScroll:"preville-formation", hoverText:"timeline.preville.formation", fudged: true}, { series: 5, date: "1753.10.25", anchorScroll:"preville-reception", hoverText:"timeline.preville.reception", fudged: false}, { series: 5, date: "1765.06.07", anchorScroll:"preville-talents", hoverText:"timeline.preville.talents", fudged: false}, { series: 5, date: "1780.02.22", anchorScroll:"preville-foire", hoverText:"timeline.preville.foire", fudged: false},   {series: 5, date: "1789.01.01", anchorScroll:"preville-senlis", hoverText:"timeline.preville.senlis", fudged: true},   {series: 5, date: "1791.11.07", anchorScroll:"preville-retour", hoverText:"timeline.preville.retour", fudged: false},  {series: 5, date: "1794.05.07", anchorScroll:"preville-madame", hoverText:"timeline.preville.madame", fudged: false},   {series: 5, date: "1799.12.18", anchorScroll:"preville-mort", hoverText:"timeline.preville.mort", fudged: false}
    ],

  }

  $scope.slickConfig = {
    dots:true,
    inifinite: true,
    slidesToShow:1
  }

  $scope.changeLang = function(l) {
    $scope.model.lang = l;
    $translate.use(l);
  }

  $scope.openModal = function(url) {
    $scope.model.modalInstance = $uibModal.open({
       templateUrl: prefix + url,
       scope: $scope,
       size: 'lg'
     });
  }

  $scope.closeModal = function() {
    $scope.model.modalInstance.close();
  }

  $scope.scrollTo = function(id) {
    var someElement = document.getElementById(id);
    $document.duScrollToElementAnimated(someElement);
  }

  $scope.$on('$locationChangeSuccess', function(event, toState){
    let target = toState.split('!/')[1]
    if(target) {
      let h = $scope.model.entities.hommes.filter(function(s){return s.pseudo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")==target})[0]
      let f =  $scope.model.entities.femmes.filter(function(s){return s.pseudo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")==target})[0]
      $scope.model.curr = f? f: h
    }
  });

  //for point filling in as you scroll
  $(window).on('scroll', function() {
    AOS.refreshHard()
    $('.timepoint').each(function() {
        var id = $(this).attr('id');
        //the premptive offset is a bit arbitrary
        if($(this).offset().top - (30*vh) <= $(window).scrollTop()) {
              document.querySelectorAll("div.timeline-point[section='" + id + "']")[0].style.background = $scope.model.curr.colour;
        }
        else {
          document.querySelectorAll("div.timeline-point[section='" + id + "']")[0].style.background = '#fff';
        }
    });
  });




});

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
          }, 300 );
        }
      }

      //vertical axis
      var vert_axis = [
        //historical
        {id: "hist-1",date: "1719.01.01", hoverText: "timeline.axis.history.one", fudged:true, type:"h"},
        {id: "hist-2",date: "1750.01.01", hoverText: "timeline.axis.history.two", fudged:true, type:"h"},
        {id: "hist-3",date: "1757.01.01", hoverText: "timeline.axis.history.three", fudged:true, type:"h"},
        {id: "hist-4",date: "1762.01.01", hoverText: "timeline.axis.history.four", fudged:true, type:"h"},
        {id: "hist-5",date: "1766.01.01", hoverText: "timeline.axis.history.five", fudged:true, type:"h"},
        {id: "hist-6",date: "1770.01.01", hoverText: "timeline.axis.history.six", fudged:true, type:"h"},
        {id: "hist-7",date: "1774.01.01", hoverText: "timeline.axis.history.seven", fudged:true, type:"h"},
        {id: "hist-8",date: "1782.01.01", hoverText: "timeline.axis.history.eight", fudged:true, type:"h"},
        {id: "hist-9",date: "1789.01.01", hoverText: "timeline.axis.history.nine", fudged:true, type:"h"},
        {id: "hist-10",date: "1790.01.01", hoverText: "timeline.axis.history.ten", fudged:true, type:"h"},
        {id: "hist-11",date: "1791.01.01", hoverText: "timeline.axis.history.eleven", fudged:true, type:"h"},
        {id: "hist-12",date: "1793.06.01", hoverText: "timeline.axis.history.twelve", fudged:true, type:"h"},

        //theatre related
        {id:"troupe-1", date: "1706.01.01", hoverText:"timeline.axis.troupe.one", fudged:true, type:"t"},
        {id:"troupe-2", date: "1715.01.01", hoverText:"timeline.axis.troupe.two", fudged:true, type:"t"},
        {id:"troupe-3", date: "1716.01.01", hoverText:"timeline.axis.troupe.three", fudged:true, type:"t"},
        {id:"troupe-4", date: "1719.01.01", hoverText:"timeline.axis.troupe.four", fudged:true, type:"t"},
        {id:"troupe-5", date: "1747.01.01", hoverText:"timeline.axis.troupe.five", fudged:true, type:"t"},
        {id:"troupe-6", date: "1750.01.01", hoverText:"timeline.axis.troupe.six", fudged:true, type:"t"},
        {id:"troupe-7", date: "1762.01.01", hoverText:"timeline.axis.troupe.seven", fudged:true, type:"t"},
        {id:"troupe-8", date: "1777.01.01", hoverText:"timeline.axis.troupe.eight", fudged:true, type:"t"}

      ]


      //preliminary data processing
      var max = Date.parse(scope.maxDate)
      var min = Date.parse(scope.minDate)


      var draw = function() {

        element.ready(function(){
          d3Service.d3().then(function(d3) {
            //get and set details
            let elem = element[0]
            let width = window.innerWidth - ((window.innerHeight/100)*60) ;
            let height = window.innerHeight*0.8
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
            var tip = d3.select('#timeline')
              .append('div')
              .style("opacity", 0)
              .style("position", "absolute")
              .style("background","rgba(100, 100, 100, 0.6)")
              .style("color", "white")
              .style("padding", "5px 10px 5px 10px")
              .style("-moz-border-radius", "8px 8px")
              .style("border-radius", "8px 8px")
              .style("z-index", 9999)
              .style("min-width", '15vw')
              .style("max-width", '21vw')
              .style("font-size", '13px');

            //functions for x and y vals
            var xVal = function(date){
              console.log(date.replaceAll(".", "-"))
              let d = new Date(date.replaceAll(".", "-")).getTime()
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
              .style("stroke-width", Math.floor(line_width/2.5))
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
                tip.append("div").html('<b>' + formatDate  + '</b>');
                tip.append("div").html('<p>' + langText+ '</p>')
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

              //todo later - find a way to flip if possible
              svg.on("mousemove", function(){
              let mouse = d3.mouse(this)

              tipPixels = parseInt(tip.style("height").replace("px", ""));
              return tip.style("top", (mouse[1]-tipPixels-margin-radius)+"px").style("left", mouse[0]+"px");})
              .on("mouseout", function(){return tip.style("opacity", 0).style("top","0px").style("left","0px");});

              //draw axis for historical events
              svg.selectAll("axis")
              .data(vert_axis)
              .enter()
              .append("line")
              .attr("x1", function(d){return xVal(d.date)})
              .attr("y1", yVal(0) - 30)
              .attr("x2", function(d){return xVal(d.date)})
              .attr("y2", yVal(5) + 30)
              .attr('id', function(d){return d.id})
              .style("stroke", "rgb(175,175,175)")
              .style("stroke-width", Math.floor(line_width/4))


              //add points for vertical axis (history) interactivity
              svg.selectAll("axis-point")
              .data(vert_axis.filter(function(x){return x.type=='h'}))
              .enter()
              .append("circle")
              .attr("cx", function(d){return xVal(d.date)})
              .attr("cy", yVal(0) - 30)
              .attr("r", radius/2)
              .attr("stroke", "rgb(175,175,175)")
              .style("stroke-width", Math.floor(line_width/2))
              .style("fill", "rgb(175,175,175)")
              .on("mouseover", function(d){
                //translate
                let langText = $translate.instant(d.hoverText)
                let formatDate = d.fudged? d.date.substr(0,4):d.date
                //swell and colour change
                d3.select(this)
                .style("fill", "red").transition()
                .style("stroke","red")
                .duration(100).attr("r", radius*0.75);

                d3.select("#" + d.id)
                .style("stroke","red").transition()
                //append the tooltip
                tip.html("");
                tip.append("div").html('<b>' + formatDate  + '</b>');
                tip.append("div").html('<p>' + langText+ '</p>')
                tip.transition()
                .duration(100)
                .style("opacity", .9);

              })
              .on("mouseout", function(d){
                d3.select(this)
                .style("stroke", 'rgb(175,175,175)')
                .style("fill", 'rgb(175,175,175)').transition()
                .duration(100).attr("r", radius/2);

                d3.select("#" + d.id)
                .style("stroke","rgb(175,175,175)").transition()

                tip.transition()
                .duration(100)
                .style("opacity", 0)
              })


              //do the same for the troupe events
              svg.selectAll("axis-point")
              .data(vert_axis.filter(function(x){return x.type=='t'}))
              .enter()
              .append("circle")
              .attr("cx", function(d){return xVal(d.date)})
              .attr("cy", yVal(5) + 30)
              .attr("r", radius/2)
              .attr("stroke", "rgb(175,175,175)")
              .style("stroke-width", Math.floor(line_width/2))
              .style("fill", "rgb(175,175,175)")
              .on("mouseover", function(d){
                //translate
                let langText = $translate.instant(d.hoverText)
                let formatDate = d.fudged? d.date.substr(0,4):d.date
                //swell and colour change
                d3.select(this)
                .style("fill", "red").transition()
                .style("stroke","red")
                .duration(100).attr("r", radius*0.75);

                d3.select("#" + d.id)
                .style("stroke","red").transition()
                //append the tooltip
                tip.html("");
                tip.append("div").html('<b>' + formatDate  + '</b>');
                tip.append("div").html('<p>' + langText+ '</p>')
                tip.transition()
                .duration(100)
                .style("opacity", .9);

              })
              .on("mouseout", function(d){
                d3.select(this)
                .style("stroke", 'rgb(175,175,175)')
                .style("fill", 'rgb(175,175,175)').transition()
                .duration(100).attr("r", radius/2);

                d3.select("#" + d.id)
                .style("stroke","rgb(175,175,175)").transition()

                tip.transition()
                .duration(100)
                .style("opacity", 0)
              })




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
