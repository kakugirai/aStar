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
        'curve-style': 'bezier'
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
    cy.add({ group: "nodes", data: { id: count }, position: { x: e.pageX, y: e.pageY } });
    count++;
  });

  $('#cy').click(function(e) {
    selectedNodes = []
    cy.elements().each(function(i, ele){
      if (ele.selected()) {
        selectedNodes.push(ele.id())
      }
      // console.log( ele.id() + ' is ' + ( ele.selected() ? 'selected' : 'not selected' ) );
    });
    if (selectedNodes.length == 2) {
      edgeWeight = prompt("Please enter the cost of the edge")
      if (edgeWeight != null) {
        cy.add({ group: "edges", data: { id: selectedNodes[0]+selectedNodes[1], weight: edgeWeight, source: selectedNodes[0], target: selectedNodes[1], label: "edgeWeight" } })
      }
      for (var i = selectedNodes.length - 1; i >= 0; i--) {
        cy.$('#'+ selectedNodes[i]).unselect();
      }
    }
  });

  $("#aStarBtn").click(function(){

    var aStar = cy.elements().aStar({ root: "#"+$('#startNode').val(), goal: "#"+$('#endNode').val() });
    aStar.path.select();
  })
});