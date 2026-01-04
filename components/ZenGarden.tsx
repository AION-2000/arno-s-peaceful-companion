
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ZenGarden: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const render = () => {
      const svg = d3.select(svgRef.current);
      const width = svgRef.current!.clientWidth;
      const height = svgRef.current!.clientHeight;
      
      svg.selectAll('*').remove();

      const nodes = d3.range(25).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * (width < 600 ? 12 : 20) + 5,
        color: d3.interpolateWarm(Math.random())
      }));

      const simulation = d3.forceSimulation(nodes as any)
        .force('charge', d3.forceManyBody().strength(5))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius((d: any) => d.r + 2))
        .on('tick', () => {
          circles
            .attr('cx', (d: any) => d.x)
            .attr('cy', (d: any) => d.y);
        });

      const circles = svg.selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', (d: any) => d.r)
        .attr('fill', (d: any) => d.color)
        .attr('opacity', 0.6)
        .style('cursor', 'pointer')
        .call(d3.drag()
          .on('start', (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any
        );

      return simulation;
    };

    let sim = render();

    const handleResize = () => {
      if (sim) sim.stop();
      sim = render();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sim) sim.stop();
    };
  }, []);

  return (
    <div className="w-full h-[45vh] max-h-[450px] bg-slate-900 rounded-[2rem] sm:rounded-3xl overflow-hidden relative soft-shadow">
      <div className="absolute top-4 left-4 z-10 text-white/70 pointer-events-none px-2">
        <h3 className="font-semibold text-sm sm:text-base">Zen Flow</h3>
        <p className="text-[10px] sm:text-xs">Drag the bubbles to play with harmony</p>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default ZenGarden;
