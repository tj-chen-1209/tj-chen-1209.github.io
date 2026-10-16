<span id="projects"></span>
<h2 id="-projects" class="home-section-title">Selected Projects</h2>
<p class="section-intro">From human motion to robot control, with hands-on systems work and policy evaluation.</p>

{% assign featured_projects = site.data.projects | where: "featured", true %}
{% for project in featured_projects %}
{% include project_card.html project=project %}
{% endfor %}

{% assign additional_projects = site.data.projects | where: "featured", false %}
{% if additional_projects.size > 0 %}
<details class="additional-projects">
  <summary>More projects: RLinf integration &amp; OptiTrack teleoperation</summary>
  {% for project in additional_projects %}
  {% include project_card.html project=project %}
  {% endfor %}
</details>
{% endif %}
