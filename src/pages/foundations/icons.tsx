import React from "react"
import { useState } from "react"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import MainLayout from "../../layouts/MainLayout"
import iconGuideGridImage from "../../assets/img/icon-guide-grid.png"
import iconGuideStyleImage from "../../assets/img/icon-guide-style.png"

const ModusIcons = [
  { icon: "3d_buildings" },
  { icon: "add" },
  { icon: "add_new_road" },
  { icon: "arrow_left" },
  { icon: "arrow_left_bold" },
  { icon: "arrow_right" },
  { icon: "arrow_right_bold" },
  { icon: "blank" },
  { icon: "blocks_four" },
  { icon: "blocks_four_outline" },
  { icon: "box_zoom" },
  { icon: "calendar" },
  { icon: "car" },
  { icon: "car_front" },
  { icon: "change_start_time" },
  { icon: "chat" },
  { icon: "check" },
  { icon: "checkbox_checked" },
  { icon: "checkbox_unchecked" },
  { icon: "check_circle" },
  { icon: "chevron" },
  { icon: "chevron_down_thick" },
  { icon: "chevron_left" },
  { icon: "chevron_left_thick" },
  { icon: "chevron_right" },
  { icon: "chevron_right_thick" },
  { icon: "chevron_up_thick" },
  { icon: "circle" },
  { icon: "circle_add" },
  { icon: "circle_add_outline" },
  { icon: "circle_arrow_up" },
  { icon: "circle_check_outline" },
  { icon: "circle_close" },
  { icon: "circle_close_outline" },
  { icon: "circle_dot" },
  { icon: "circle_dot_outline" },
  { icon: "circle_minus" },
  { icon: "circle_notch" },
  { icon: "circle_outline" },
  { icon: "circle_play" },
  { icon: "clipboard" },
  { icon: "clock" },
  { icon: "close" },
  { icon: "cloud" },
  { icon: "cloud_download" },
  { icon: "cloud_upload" },
  { icon: "cluster" },
  { icon: "company_administration" },
  { icon: "compare_arrows" },
  { icon: "configuration_management" },
  { icon: "crop" },
  { icon: "crow_fly" },
  { icon: "dashboard" },
  { icon: "disk" },
  { icon: "dispatch" },
  { icon: "driver" },
  { icon: "driver_groups" },
  { icon: "edit" },
  { icon: "edit_line" },
  { icon: "edit_road" },
  { icon: "envelope" },
  { icon: "expand" },
  { icon: "expand_less" },
  { icon: "expand_more" },
  { icon: "export" },
  { icon: "external_link" },
  { icon: "eyedropper" },
  { icon: "facebook" },
  { icon: "filter" },
  { icon: "finalize_route" },
  { icon: "flag" },
  { icon: "flash_on" },
  { icon: "folder" },
  { icon: "frame" },
  { icon: "frame_stop" },
  { icon: "gear" },
  { icon: "gears" },
  { icon: "geocode", tags: "globe" },
  { icon: "globe" },
  { icon: "hand" },
  { icon: "hand_pan" },
  { icon: "heavy_duty", tags: "truck" },
  { icon: "help" },
  { icon: "highway" },
  { icon: "info" },
  { icon: "inspect" },
  { icon: "invert_route" },
  { icon: "layout" },
  { icon: "light_duty", tags: "truck" },
  { icon: "link" },
  { icon: "list_bulleted" },
  { icon: "load" },
  { icon: "location" },
  { icon: "location_arrow" },
  { icon: "location_point" },
  { icon: "lock" },
  { icon: "lock_open" },
  { icon: "manage_places" },
  { icon: "manage_route_modifiers" },
  { icon: "map" },
  { icon: "map_layers" },
  { icon: "map_marker" },
  { icon: "map_markers" },
  { icon: "maximize" },
  { icon: "medium_duty", tags: "truck" },
  { icon: "menu", tags: "hamburger" },
  { icon: "minimize" },
  { icon: "minus" },
  { icon: "more_horizontal" },
  { icon: "more_vertical" },
  { icon: "my_trip" },
  { icon: "no_entry" },
  { icon: "one_way_left", tags: "arrow" },
  { icon: "one_way_right", tags: "arrow" },
  { icon: "optimize" },
  { icon: "orders" },
  { icon: "palette" },
  { icon: "paper_plane" },
  { icon: "pin_icon" },
  { icon: "pin_icon_plus" },
  { icon: "poi" },
  { icon: "polygon" },
  { icon: "polygon_concave" },
  { icon: "polygon_cone" },
  { icon: "polygon_select" },
  { icon: "preview" },
  { icon: "radar" },
  { icon: "radio_button_checked" },
  { icon: "radio_button_unchecked" },
  { icon: "random" },
  { icon: "refresh" },
  { icon: "rename_route" },
  { icon: "reports" },
  { icon: "reroute" },
  { icon: "reschedule_route" },
  { icon: "road_surface" },
  { icon: "route" },
  { icon: "route_add" },
  { icon: "route_compliance" },
  { icon: "route_delete" },
  { icon: "route_load" },
  { icon: "route_modifiers" },
  { icon: "route_off" },
  { icon: "route_on" },
  { icon: "route_optimize" },
  { icon: "route_options" },
  { icon: "route_save" },
  { icon: "school_bus" },
  { icon: "search" },
  { icon: "share" },
  { icon: "show_closest" },
  { icon: "show_truck_info" },
  { icon: "site_manager" },
  { icon: "sort" },
  { icon: "sort_alpha_down" },
  { icon: "sort_alpha_up" },
  { icon: "sort_amount_down" },
  { icon: "sort_amount_up" },
  { icon: "sort_numeric_down" },
  { icon: "sort_numeric_up" },
  { icon: "speed_coaching_profiles" },
  { icon: "spinner" },
  { icon: "star" },
  { icon: "star_outline" },
  { icon: "stop_details" },
  { icon: "stop_summary" },
  { icon: "stop_time" },
  { icon: "suggestion" },
  { icon: "swatch" },
  { icon: "text" },
  { icon: "today" },
  { icon: "toggle" },
  { icon: "traffic" },
  { icon: "train" },
  { icon: "trash" },
  { icon: "triangle_left" },
  { icon: "triangle_right" },
  { icon: "trim_fake_orders" },
  { icon: "truck" },
  { icon: "turn_dispatch_mode_on" },
  { icon: "twitter" },
  { icon: "two_way" },
  { icon: "unloaded_order" },
  { icon: "unloaded_orders" },
  { icon: "unload_route_stop" },
  { icon: "update" },
  { icon: "upgrade_modifiers" },
  { icon: "user" },
  { icon: "user_fields" },
  { icon: "vehicle_groups" },
  { icon: "visibility", tags: "eye" },
  { icon: "visibility_off", tags: "eye" },
  { icon: "volumes" },
  { icon: "warning" },
  { icon: "weather_alerts" },
  { icon: "zoom_in" },
  { icon: "zoom_out" },
]

const ModusIconItem = ({ icon, tags, ...props }) => {
  return (
    <li
      id={icon}
      className="col text-center mb-3 notranslate"
      data-tags={`{icon} {tags}`}
    >
      <div className="border border-bottom-0 py-3">
        <i className="modus-icons notranslate">{icon}</i>
      </div>
      <div className="code-sample bg-light border border-top-0 highlight py-2 text-monospace">
        &lt;<span className="nt">i</span> <span className="na">class</span>="
        <span className="s">modus-icons</span>"&gt;{icon}&lt;/
        <span className="nt">i</span>&gt;
      </div>
    </li>
  )
}

const ModusIconsListing = props => {
  const [iconList, setIconList] = useState(ModusIcons)
  const handleSearch = event => {
    let searchText = event.target.value.toLowerCase()
    setIconList(
      ModusIcons.filter(item => item.icon.toLowerCase().includes(searchText))
    )
  }
  return (
    <Form className="ml-0 mb-2">
      <Form.Group controlId="iconSearch">
        <Form.Label className="sr-only">Search for icons</Form.Label>
        <Form.Control
          className="form-control search"
          placeholder="Start typing to filter..."
          type="search"
          title=""
          required
          onKeyPress={event => event.keyCode != 13}
          onChange={handleSearch}
        />
      </Form.Group>
      <ul
        className="row row-cols-1 row-cols-md-2 list-unstyled list"
        id="icons-list"
      >
        {iconList.map(item => (
          <ModusIconItem icon={item.icon} key={item.icon} tags={item.tags} />
        ))}
      </ul>
    </Form>
  )
}

const IconsPage = props => (
  <MainLayout {...props}>
    <article id="main" className="pr-3">
      <h2 id="usage-guidelines" className="h1 font-weight-bold mt-5">
        Usage Guidelines
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#usage-guidelines"
          aria-label="anchor"
        ></a>
      </h2>
      <p>
        The easiest way to start using our icons is to include the following
        code in the <code>&lt;head&gt;</code> of your page.
      </p>
      <div className="highlight">
        <pre tabIndex={0} className="chroma">
          <code className="language-html" data-lang="html">
            <span className="p">&lt;</span>
            <span className="nt">link</span> <span className="na">rel</span>
            <span className="o">=</span>
            <span className="s">"stylesheet"</span>{" "}
            <span className="na">href</span>
            <span className="o">=</span>
            <span className="s">
              "https://modus.trimble.com/assets/0.5.1/fonts/modus-icons.css"
            </span>
            <span className="p">&gt;</span>
          </code>
        </pre>
      </div>
      <p>
        Then use{" "}
        <code>
          &lt;i className="modus-icon material-icons&gt;icon_name&lt;/i&gt;
        </code>{" "}
        with the name of the icon inside to insert it into your page.
      </p>
      <h2 id="design-guide" className="h1 font-weight-bold mt-5">
        Design Guide
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#design-guide"
          aria-label="anchor"
        ></a>
      </h2>
      <h3 id="grid" className="h2 font-weight-bold mt-3">
        Grid
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#grid"
          aria-label="anchor"
        ></a>
      </h3>
      <img
        src={iconGuideGridImage}
        width="345"
        height="140"
        loading="lazy"
        alt=""
        className="img-fluid float-right"
      />
      The standard icon size for the DRTrack icon set is 16px. The icons are
      built upon a base grid structure that includes guidelines for sizing of
      different shaped icons. These scale guidelines ensure each icon has the
      same visual weight so they all feel the same size, regardless of their
      overall shapes.
      <br />
      <br />
      <br />
      <h3 id="style" className="h2 font-weight-bold mt-3">
        Style
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#style"
          aria-label="anchor"
        ></a>
      </h3>
      <img
        src={iconGuideStyleImage}
        width="345"
        height="205"
        loading="lazy"
        alt=""
        className="img-fluid float-right"
      />
      This icon set is built with a balanced combination of crisp geometric
      shapes, and subtle rounded corners to soften the edges and make them feel
      humanistic. When possible, 1px gap is added to define shapes or add
      details.
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2 id="icons" className="h1 font-weight-bold mt-5">
        Icons
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#icons"
          aria-label="anchor"
        ></a>
      </h2>
      <ModusIconsListing />
    </article>
  </MainLayout>
)

export default IconsPage
