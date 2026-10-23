<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <!-- Root template -->
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>Sitemap file</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            background-color: #fff;
            font-family: Verdana, sans-serif;
            margin: 20px 25px;
            color: #000;
          }

          h1 {
            font-size: 1.25em;
            font-weight: bold;
            margin: 0 0 6px 0;
            color: #000;
          }

          #information p {
            font-size: 0.9em;
            color: #000;
            margin: 0 0 12px 0;
          }

          table.sitemap {
            background-color: #cdcdcd;
            margin: 10px 0 15px;
            width: 100%;
            text-align: left;
            border-collapse: collapse;
          }

          table.sitemap thead tr th {
            background-color: #e6eeee;
            border: 1px solid #fff;
            padding: 4px 6px;
            font-size: 12px;
            font-weight: bold;
            color: #000;
          }

          table.sitemap thead tr th.highlight {
            background-color: #5050d3;
            color: #fff;
            font-style: italic;
          }

          table.sitemap tbody td {
            color: #3d3d3d;
            padding: 4px 6px;
            background-color: #fff;
            vertical-align: top;
            font-size: 12px;
            border-bottom: 1px solid #e5e5e5;
          }

          table.sitemap tbody tr:nth-child(even) td {
            background-color: #efefef;
          }

          table.sitemap tbody tr:hover td {
            background-color: #e8f0fe;
          }

          a {
            color: #1a0dab;
            text-decoration: underline;
          }

          a:visited {
            color: #609;
          }

          a:hover {
            color: #d14836;
          }

          ul.images {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          ul.images li {
            margin-bottom: 2px;
          }

          #footer {
            font-size: 11px;
            color: #777;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <header role="banner">
          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">
              <h1>Sitemap file: <span id="header-url">https://www.dimisipedia.me/sitemap.xml</span></h1>
            </xsl:when>
            <xsl:otherwise>
              <h1>Sitemap file: <span id="header-url"><xsl:value-of select="/sitemap:urlset/sitemap:url[1]/sitemap:loc"/></span></h1>
            </xsl:otherwise>
          </xsl:choose>
        </header>

        <main role="main">
          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">
              <xsl:call-template name="sitemapIndexTable"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:call-template name="sitemapTable"/>
            </xsl:otherwise>
          </xsl:choose>
        </main>

        <footer role="contentinfo" id="footer">
          <p>DIMISIPEDIA Enterprise Sitemap System · Modeled on Tech Mahindra XML Sitemap Architecture</p>
        </footer>

        <script type="text/javascript">
          if (typeof window !== 'undefined') {
            var urlSpan = document.getElementById('header-url');
            if (urlSpan) {
              urlSpan.textContent = window.location.href;
            }
          }
        </script>
      </body>
    </html>
  </xsl:template>

  <!-- sitemapIndexTable template -->
  <xsl:template name="sitemapIndexTable">
    <div id="information">
      <p>Number of sitemaps in this index: <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></p>
    </div>
    <table class="sitemap index">
      <thead>
        <tr>
          <th class="highlight">Sitemap URL &#9650;</th>
          <th>Last modification date</th>
        </tr>
      </thead>
      <tbody>
        <xsl:apply-templates select="sitemap:sitemapindex/sitemap:sitemap"/>
      </tbody>
    </table>
  </xsl:template>

  <!-- sitemapTable template -->
  <xsl:template name="sitemapTable">
    <div id="information">
      <p>Number of URLs in this sitemap: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
    </div>
    <table class="sitemap">
      <thead>
        <tr>
          <th>URL location</th>
          <th>Last modification date</th>
          <th>Change frequency</th>
          <th class="highlight">Priority &#9660;</th>
          <xsl:if test="sitemap:urlset/sitemap:url/image:image">
            <th>Images</th>
          </xsl:if>
        </tr>
      </thead>
      <tbody>
        <xsl:apply-templates select="sitemap:urlset/sitemap:url"/>
      </tbody>
    </table>
  </xsl:template>

  <!-- sitemap:sitemap template -->
  <xsl:template match="sitemap:sitemap">
    <tr>
      <td>
        <xsl:variable name="sitemap_location">
          <xsl:value-of select="sitemap:loc"/>
        </xsl:variable>
        <a href="{$sitemap_location}">
          <xsl:value-of select="$sitemap_location"/>
        </a>
      </td>
      <td>
        <xsl:value-of select="sitemap:lastmod"/>
      </td>
    </tr>
  </xsl:template>

  <!-- sitemap:url template -->
  <xsl:template match="sitemap:url">
    <tr>
      <td>
        <xsl:variable name="url_location">
          <xsl:value-of select="sitemap:loc"/>
        </xsl:variable>
        <a href="{$url_location}">
          <xsl:value-of select="$url_location"/>
        </a>
      </td>
      <td>
        <xsl:value-of select="sitemap:lastmod"/>
      </td>
      <td>
        <xsl:choose>
          <xsl:when test="sitemap:changefreq">
            <xsl:value-of select="sitemap:changefreq"/>
          </xsl:when>
          <xsl:otherwise>weekly</xsl:otherwise>
        </xsl:choose>
      </td>
      <td>
        <xsl:choose>
          <xsl:when test="sitemap:priority">
            <xsl:value-of select="sitemap:priority"/>
          </xsl:when>
          <xsl:otherwise>1.0</xsl:otherwise>
        </xsl:choose>
      </td>
      <xsl:if test="/sitemap:urlset/sitemap:url/image:image">
        <td>
          <xsl:if test="image:image">
            <ul class="images">
              <xsl:apply-templates select="image:image"/>
            </ul>
          </xsl:if>
        </td>
      </xsl:if>
    </tr>
  </xsl:template>

  <!-- image:image template -->
  <xsl:template match="image:image">
    <xsl:variable name="image_location">
      <xsl:value-of select="image:loc"/>
    </xsl:variable>
    <xsl:variable name="image_title">
      <xsl:value-of select="image:title"/>
    </xsl:variable>
    <li>
      <a href="{$image_location}" title="{$image_title}" target="_blank">
        <xsl:choose>
          <xsl:when test="image:caption">
            <xsl:value-of select="image:caption"/>
          </xsl:when>
          <xsl:when test="image:title">
            <xsl:value-of select="image:title"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$image_location"/>
          </xsl:otherwise>
        </xsl:choose>
      </a>
    </li>
  </xsl:template>

</xsl:stylesheet>
