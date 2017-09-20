(function() {

  window.main = function() {
    var background, drag, vis, line, target, range, valueDisplay;

    vis = d3.select('svg');

    const leftBound = (vis.attr('width') / 8);
    const rightBound = ((vis.attr('width') / 8) * 7);
    const lineHeight = (vis.attr('height') / 2);
    const defaultRangeRadius = 30;
    const defaultTargetRadius = 10;
    const defaultTarget = (vis.attr('width') / 2);

    valueDisplay = vis.append('text')
                      .attr('class', 'valueDisplay')
                      .attr('x', 20)
                      .attr('y', 40)
                      .text(`Within ${defaultRangeRadius} of ${defaultTarget - leftBound}`)

    drag = d3.behavior.drag().on('drag', function() {
      let xCoord = parseInt(d3.select('.target').attr('cx'));
      let yClick = parseInt(d3.event.y);

      xCoord += parseInt(d3.event.dx);
      if (xCoord <= leftBound) {
        xCoord = leftBound;
      } else if (xCoord >= rightBound){
        xCoord = rightBound;
      } else if ((lineHeight - 10) <= yClick && yClick <= (lineHeight + 10)) {
        // Needs tuning, causes target to jump if line is crossed while not aligned
        // console.log(`${lineHeight - 10} <= ${yClick} <= ${lineHeight + 10}`);
        // xCoord = d3.event.x;
      }

      let radius = parseInt(d3.select('.range').attr('r'));
      radius -= parseInt(d3.event.dy);
      radius = radius >= defaultTargetRadius ? radius : defaultTargetRadius;

      valueDisplay.text(`Within ${radius} of ${xCoord - leftBound}`);

      d3.select('.range')
        .attr('cx', xCoord)
        .attr('r', radius);

      return d3.select('.target')
               .attr('cx', xCoord);
    });

    background = vis.append('rect')
                    .attr('class', 'background')
                    .attr('width', vis.attr('width'))
                    .attr('height', vis.attr('height'))
                    .call(drag);

    line = vis.append('line')
              .attr('class', 'line')
              .attr('x1', leftBound)
              .attr('y1', lineHeight)
              .attr('x2', rightBound)
              .attr('y2', lineHeight)
              .call(drag);

    range = vis.append('circle')
               .attr('class', 'range')
               .attr('r', defaultRangeRadius)
               .attr('cx', defaultTarget)
               .attr('cy', lineHeight)
               .call(drag);

    target = vis.append('circle')
                .attr('class', 'target')
                .attr('r', defaultTargetRadius)
                .attr('cx', defaultTarget)
                .attr('cy', lineHeight)
                .call(drag);

    vis.append('text')
       .attr('class', 'helper')
       .attr('dy', '-3em')
       .attr('x', 20)
       .attr('y', vis.attr('height') - 20)
       .text('Click and drag anywhere.')

    vis.append('text')
       .attr('class', 'helper')
       .attr('dy', '-1.5em')
       .attr('x', 20)
       .attr('y', vis.attr('height') - 20)
       .text('Drag left or right to set target.');

    vis.append('text')
       .attr('class', 'helper')
       .attr('dy', '0em')
       .attr('x', 20)
       .attr('y', vis.attr('height') - 20)
       .text('Drag up or down to set range.');
  };

}).call(this);