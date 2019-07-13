/**
 * Created by tbertonatti on 9/1/14.
 */

function graphViewPlugin(divElement, options, useReasoner) {
    var panel = this;
    this.divElement = divElement;
    // this.options = jQuery.extend(true, {}, options);
    this.type = "graphView";
    this.useReasoner = (useReasoner) ? useReasoner : options.useReasoner;
    this.conceptId = "404684003";
    panel.subscribers = [];
    panel.reasoner = getReasoner();

    var componentLoaded = false;
    $.each(componentsRegistry, function (i, field) {
        if (field.divElement && panel.divElement && field.divElement.id == panel.divElement.id) {
            componentLoaded = true;
        }
    });
    if (componentLoaded == false) {
        componentsRegistry.push(panel);
    }

    this.getNextMarkerColor = function (color) {
        //console.log(color);
        var returnColor = 'black';
        if (color == 'black') {
            returnColor = 'green';
        } else if (color == 'green') {
            returnColor = 'purple';
        } else if (color == 'purple') {
            returnColor = 'red';
        } else if (color == 'red') {
            returnColor = 'blue';
        } else if (color == 'blue') {
            returnColor = 'green';
        }
        //console.log(returnColor);
        globalMarkerColor = returnColor;
        return returnColor;
    };
    panel.markerColor = panel.getNextMarkerColor(globalMarkerColor);

    //panel.loadConcept(conceptId);

    this.setUpGraphView = function () {
        var context = {
            divElementId: panel.divElement.id
        };
        $(divElement).html(JST["views/graphView/main.hbs"](context));
        //$("#" + panel.divElement.id + "-graphViz-inheritance").closest("div").hide();
        $("#" + panel.divElement.id + "-graphViz-inheritance").unbind();
        $("#" + panel.divElement.id + "-graphViz-inheritance").change(function () {
            panel.loadConcept(panel.conceptId, true);
        });

        $(divElement).find(".viewSelection").unbind();
        $(divElement).find(".viewSelection").disableTextSelect();
        $(divElement).find(".viewSelection").click(function (e) {
            if ($(e.target).hasClass("btn-default")) {
                //$(e.target).closest(".btn-group").find(".btn-primary").first().addClass("btn-default");
                //$(e.target).closest(".btn-group").find(".btn-primary").first().removeClass("btn-primary");
                //$(e.target).addClass("btn-primary");
                //$(e.target).removeClass("btn-default");
                //panel.loadConcept(panel.conceptId, true);
                var id = $(e.target).attr("data-id");
                //if (id == "inferred")
                //    $("#" + panel.divElement.id + "-graphViz-inheritance").closest("div").show();
                //else
                //    $("#" + panel.divElement.id + "-graphViz-inheritance").closest("div").hide();
                $(divElement).find(".viewSelection").removeClass("btn-primary");
                $(divElement).find(".viewSelection").addClass("btn-default");
                $(divElement).find(".viewSelection[data-id='" + id + "']").removeClass("btn-default");
                $(divElement).find(".viewSelection[data-id='" + id + "']").addClass("btn-primary");
                //$(e.target).closest(".btn-group").find(".btn-primary").first().addClass("btn-default");
                //$(e.target).closest(".btn-group").find(".btn-primary").first().removeClass("btn-primary");
                //$(e.target).addClass("btn-primary");
                //$(e.target).removeClass("btn-default");
                panel.loadConcept(panel.conceptId);
            }
        });

    };


    this.loadConceptGraphDagre = function (data) {
        // Create the input graph
        var g = new dagreD3.graphlib.Graph()
            .setGraph({})
            .setDefaultEdgeLabel(function () { return {}; });

        var count = 0;
        data.nodes.forEach(function (node) {
            var nodeClass = "type-defined";
            if (node.defStatus == "Primitive") {
                nodeClass = "type-primitive";
            }
            g.setNode(count, { label: removeSemTag(node.name), class: nodeClass });
            count++;
        });

        g.nodes().forEach(function (v) {
            var node = g.node(v);
            // Round the corners of the nodes
            //node.rx = node.ry = 5;
        });

        data.links.forEach(function (link) {
            g.setEdge(link.source, link.target, {
                lineInterpolate: 'bundle',
                arrowheadStyle: "fill: #fff"
            });
        });

        // Create the renderer
        var render = new dagreD3.render();

        // Clean canvas
        $("#" + panel.divElement.id + "-svgdiv").empty();

        // Set up an SVG group so that we can translate the final graph.
        var divWidth = $(divElement).width() - 50;
        var windowHeigth = $(window).height() - 140;
        var w = 500,
            h = 500;

        if (divWidth > w) w = divWidth;
        if (windowHeigth > h) h = windowHeigth;

        var svg = d3.select("#" + panel.divElement.id + "-svgdiv").append("svg")
            .attr("width", w)
            .attr("height", h),
            svgGroup = svg.append("g"),
            zoom = d3.behavior.zoom().on("zoom", function () {
                svgGroup.attr("transform", "translate(" + d3.event.translate + ")" +
                    "scale(" + d3.event.scale + ")");
            });
        svg.call(zoom);
        g.graph().rankdir = "BT";


        // Run the renderer. This is what draws the final graph.
        render(d3.select("#" + panel.divElement.id + "-svgdiv").select("svg g"), g);

        // Zoom and scale to fit
        var graphWidth = g.graph().width + 80;
        var graphHeight = g.graph().height + 40;
        var width = parseInt(svg.style("width").replace(/px/, ""));
        var height = parseInt(svg.style("height").replace(/px/, ""));
        var zoomScale = Math.min(width / graphWidth, height / graphHeight);
        var translate = [(width / 2) - ((graphWidth * zoomScale) / 2), (height / 2) - ((graphHeight * zoomScale) / 2)];
        zoom.translate(translate);
        zoom.scale(zoomScale);
        zoom.event(svg.transition().duration(500));

    };

    panel.setUpGraphView();
    panel.loadConcept = function (conceptId, changeForm) {
        panel.conceptId = conceptId;
        if (!changeForm) {
            $("#" + panel.divElement.id + "-svgdiv").attr("data-loaded", "false");
            $("#" + panel.divElement.id + "-graphViz").attr("data-loaded", "false");
        }

        var objToSend = {
            pathId: options.path.id,
            brief: "false",
            form: $("#" + panel.divElement.id + "-svgdiv-content").find(".btn-primary").first().attr("data-id"),
            includeSelf: "true",
            list: [conceptId],
            command: "forD3",
            widthInInches: "28",
            heigthInInches: "18",
            fontSize: "10"
        };

        var loadVizSvg = function () {
            $("#" + panel.divElement.id + "-graphViz-download-dropdown").hide();
            $("#" + panel.divElement.id + "-graphViz").empty();
            jQuery('<div/>', {
                id: panel.divElement.id + '-graphViz-svg',
            }).appendTo("#" + panel.divElement.id + "-graphViz");
            $("#" + panel.divElement.id + "-graphViz-svg").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>");
            var objToSend2 = $.extend(true, {}, objToSend);
            objToSend2.command = "viz";
            if ($("#" + panel.divElement.id + "-graphViz-inheritance").is(":checked"))
                objToSend2.command = "vizInh";
            objToSend2.form = $("#" + panel.divElement.id + "-graphViz-content").find(".btn-primary").first().attr("data-id");

            if (panel.useReasoner && panel.reasoner) {
                // delete options.useReasoner;
                objToSend2.form = "inferred";
                objToSend2.command = "vizReasoner";
            }

            $.ajax({
                type: "POST",
                url: options.serverUrl + '/' + options.edition + '/' + options.release + '/ancestors?access_token=' + options.token + "&projectId=" + options.projectId,
                data: objToSend2,
                dataType: 'json'
            }).done(function (result) {
                $("#" + panel.divElement.id + "-graphViz").attr("data-loaded", "true");
                $("#" + panel.divElement.id + "-graphViz-download-dropdown").show();
                $("#" + panel.divElement.id + "-graphViz-download").show();
                $("#" + panel.divElement.id + "-graphViz-download").unbind();
                $("#" + panel.divElement.id + "-graphViz-download").disableTextSelect();
                $("#" + panel.divElement.id + "-graphViz-download").click(function () {
                    download(result.svg, "ancestors-graph.svg", "text/plain;charset=utf-8");
                });

                $("#" + panel.divElement.id + "-dot-download").show();
                $("#" + panel.divElement.id + "-dot-download").unbind();
                $("#" + panel.divElement.id + "-dot-download").disableTextSelect();
                $("#" + panel.divElement.id + "-dot-download").click(function () {
                    download(result.dot, "ancestors-graph.g", "text/plain;charset=utf-8");
                });

                //var resultHtml = result.svg;
                var resultsSvg = $.parseXML(result.svg);
                $("#" + panel.divElement.id + "-graphViz-svg").addClass("animated zoomIn");
                //var svg = d3.select("#" + panel.divElement.id + "-graphViz").html(resultHtml);
                $("#" + panel.divElement.id + "-graphViz-svg").graphviz({
                    //url: "ancestors-graph.svg",
                    svg: resultsSvg,
                    zoom: false,
                    shrink: 0,
                    ready: function () {
                        var gv = this;
                        gv.nodes().click(function () {
                            var $set = $();
                            $set.push(this);
                            $set = $set.add(gv.linkedFrom(this, true));
                            $set = $set.add(gv.linkedTo(this, true));
                            gv.highlight($set, true);
                            gv.bringToFront($set)
                        });
                        //$(document).keydown(function (evt) {
                        //    if (evt.keyCode == 27) {
                        //        gv.highlight()
                        //    }
                        //});
                        window.setTimeout(function () {
                            $("#" + panel.divElement.id + "-graphViz-svg").removeClass('animated zoomIn');
                        }, 1000);
                    }
                });
            }).fail(function (err) {
                console.log(err);
                alertEvent("Failed", "error");
            });
        };

        var loadD3 = function () {
            $("#" + panel.divElement.id + "-svgdiv").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>");
            $.ajax({
                type: "POST",
                url: options.serverUrl + '/' + options.edition + '/' + options.release + '/ancestors?access_token=' + options.token + "&projectId=" + options.projectId,
                data: objToSend,
                dataType: 'json'
            }).done(function (result) {
                //console.log(result);
                $("#" + panel.divElement.id + "-svgdiv").attr("data-loaded", "true");
                var d3Data = {
                    nodes: [],
                    links: []
                };
                var idsMap = {};
                var count = 0;
                if (objToSend.form == "inferred") {
                    result.collectedAncestors.push({ conceptId: "138875005", defaultTerm: "SNOMED CT Concept (SNOMED RT+CTV3)", relationships: [], statedRelationships: [], definitionStatus: "Primitive" });
                }
                $.each(result.collectedAncestors, function (i, ancestor) {
                    var group = 0;
                    if (ancestor.definitionStatus == "Primitive") {
                        group = 1;
                    }
                    d3Data.nodes.push({
                        name: ancestor.defaultTerm,
                        defStatus: ancestor.definitionStatus
                    });
                    idsMap[ancestor.conceptId] = count;
                    count++;
                });
                $.each(result.collectedAncestors, function (i, ancestor) {
                    var fieldToIterate = "relationships";
                    if (objToSend.form == "stated")
                        fieldToIterate = "statedRelationships";
                    if (!ancestor[fieldToIterate] || !ancestor[fieldToIterate].length)
                        ancestor[fieldToIterate] = [];
                    $.each(ancestor[fieldToIterate], function (i, rel) {
                        if (rel.type.conceptId == "116680003" && rel.active == "true") {
                            if (typeof idsMap[rel.target.conceptId] != "undefined") {
                                d3Data.links.push({
                                    source: idsMap[ancestor.conceptId],
                                    target: idsMap[rel.target.conceptId],
                                    value: 1,
                                    p: rel.p
                                });
                            }
                        }
                    });
                });
                //console.log(d3Data);
                panel.loadConceptGraphDagre(d3Data);
            }).fail(function (err) {
                console.log(err);
                alertEvent("Failed", "error");
                // console.log("hola");
            }).always(function () {
            });
        };

        if ($("#" + panel.divElement.id + "-li").hasClass("active") || options.alwaysShow) {
            if ($("#" + panel.divElement.id + "-svgdiv-li").hasClass("active")) {
                if ($("#" + panel.divElement.id + "-svgdiv").attr("data-loaded") == "false" || changeForm)
                    loadD3();
            } else {
                if ($("#" + panel.divElement.id + "-graphViz").attr("data-loaded") == "false" || changeForm)
                    loadVizSvg();
            }
        } else {
            var loaded = false;
            $("#" + panel.divElement.id + "-li").find("a").first().unbind();
            $("#" + panel.divElement.id + "-li").find("a").first().click(function () {
                if ($("#" + panel.divElement.id + "-svgdiv-li").hasClass("active")) {
                    if ($("#" + panel.divElement.id + "-graphViz").attr("data-loaded") == "false")
                        loadD3();
                } else {
                    if ($("#" + panel.divElement.id + "-graphViz").attr("data-loaded") == "false")
                        loadVizSvg();
                }
            });
        }

        if (panel.useReasoner) {
            $("#" + panel.divElement.id + "-graphViz-inheritance").closest("div").hide();
            $("#" + panel.divElement.id + "-vizBtnGroup").hide();
            //-graphViz-inheritance closest div
            //vizBtnGroup

        }

        $("#" + panel.divElement.id + "-svgdiv-li").find("a").first().unbind();
        $("#" + panel.divElement.id + "-svgdiv-li").find("a").first().click(function () {
            if ($("#" + panel.divElement.id + "-svgdiv").attr("data-loaded") == "false")
                loadD3();
        });
        $("#" + panel.divElement.id + "-graphViz-li").find("a").first().unbind();
        $("#" + panel.divElement.id + "-graphViz-li").find("a").first().click(function () {
            if ($("#" + panel.divElement.id + "-graphViz").attr("data-loaded") == "false")
                loadVizSvg();
        });
    };

    this.subscribe = function (panelToSubscribe) {
        var panelId = panelToSubscribe.divElement.id;
        var subscription = channel.subscribe(panelId, function (data, envelope) {
            if (data && data.conceptId) {
                panel.loadConcept(data.conceptId);
            }
        });
    };
}