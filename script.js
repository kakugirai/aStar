$(function() {
  var cy = cytoscape({
    container: document.getElementById('cy'),

    style: cytoscape.stylesheet()
      .selector('node')
      .css({
        'content': 'data(id)'
      })
      .selector('edge')
      .css({
        'target-arrow-shape': 'none',
        'width': 4,
        'line-color': '#ddd',
        'curve-style': 'bezier',
        'content': 'data(weight)'
      })
      .selector('.highlighted')
      .css({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'transition-duration': '0.5s'
      })
  });

  var count = 0;
  $('#cy').dblclick(function(e) {
    // console.log(e.pageX)
    // console.log(e.pageY)
    cy.add({
      group: "nodes",
      data: {
        id: count
      },
      position: {
        x: e.pageX,
        y: e.pageY
      },
      classes : "node"
    });
    count++;
  });

  $('#cy').click(function(e) {
    selectedNodes = []
    cy.elements().each(function(i, ele) {
      if (ele.selected()) {
        selectedNodes.push(ele.id())
      }
      // console.log( ele.id() + ' is ' + ( ele.selected() ? 'selected' : 'not selected' ) );
    });
    if (selectedNodes.length == 2) {
      edgeWeight = prompt("Please enter the cost of the edge")
      if (edgeWeight != null) {
        cy.add({
          group: "edges",
          data: {
            id: selectedNodes[0] + selectedNodes[1],
            weight: edgeWeight,
            source: selectedNodes[0],
            target: selectedNodes[1],
            classes: "edge"
          }
        })
      }
      for (var i = selectedNodes.length - 1; i >= 0; i--) {
        cy.$('#' + selectedNodes[i]).unselect();
      }
    }
  });

  // $("#aStarBtn").click(function() {

  //   var aStar = cy.elements().aStar({
  //     root: "#" + $('#startNode').val(),
  //     goal: "#" + $('#endNode').val()
  //   });
  //   aStar.path.select();
  // })


  $("#aStarBtn").click(function() {
    var dijkstra = cy.elements().dijkstra(("#" + $('#startNode').val()), function(){
      console.log("id: " + this.data('id') + "\nweight: " + this.data('weight'));
      return this.data('weight');
  }, false);
    var pathToJ = dijkstra.pathTo( cy.$("#" + $('#endNode').val()) );

    for (var i = pathToJ.length - 1; i >= 0; i--) {
      console.log(pathToJ[i])
      pathToJ[i].addClass('highlighted');
    }
    // var i = 0;
    // var highlightNextEle = function(){
    //   if( i < pathToJ.length ){
    //     pathToJ[i].addClass('highlighted');
    //     i++;
    //     setTimeout(highlightNextEle, 500);
    //   }
    // };
    // highlightNextEle();
  })
  $("#clearBtn").click(function() {
    cy.$().remove();
  })
});