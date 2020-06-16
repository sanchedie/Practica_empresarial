console.log ("Hola desde grafo")
d3.json("rutas.json"). then (function(data){
    
   console.log ("Ya hemos recibido los datos")
   window.data = data

   // ESCALA DE COLORES
   var escalaColor=d3.scaleOrdinal(d3.schemeCategory10)
    
   //Establecer fuerzas
   var layout = d3.forceSimulation()
        .force("link",d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(300,300))
    
    layout  
        .nodes(data.nodes)
        .on("tick",onTick)
    
    layout
        .force("link")
        .links(data.links)
    
    // CREAMOS SVG
    var svg = d3.select ("body")
        .append ("svg")
        .attr ("width", 500)
        .attr ("height",500)
    
    
    // creacion de enlaces y nodos 
    var links = svg
        .append ("g")
        .attr("class", "links")     
        .attr("stroke", "#999")     
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke","#aaa")
    
    // se establece el grosor de los enlaces
        .attr("stroke-width", d=>d.costo_combustible/20000) 
        .style ("stroke", d => {
        if (d.source.group == d.target.group)
           return (escalaColor(d.source.group))
        else
            return ("#aaa")
        })
    
    var nodes=svg   
        .append ("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append ("circle")
        .attr ("r",8)
        .attr("fill", d=>escalaColor(d.group)) 
                   
    nodes.append("title")
         .text(function(d) { return d.name; })
    
    links.append("title")
         .text(function(d) { return d.costo_combustible; })
 
    
    // FUNCTION ONTICK
    function onTick(){
         nodes
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
         
         links  
            .attr("x1", d=> d.source.x)
            .attr("x2", d=> d.target.x)
            .attr("y1", d=> d.source.y)
            .attr("y2", d=> d.target.y)
    }    
})