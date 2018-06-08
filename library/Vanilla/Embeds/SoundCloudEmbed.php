<?php
/**
 * Created by PhpStorm.
 * User: chris
 * Date: 2018-06-05
 * Time: 5:55 PM
 */

namespace Vanilla\Embeds;


class SoundCloudEmbed extends Embed {

    /** @inheritdoc */
    protected $type = 'soundcloud';

    /** @inheritdoc */
    protected $domains = ['soundcloud.com'];

    public function __construct() {
        parent::__construct('soundcloud', 'image');
    }

    /**
     * @inheritdoc
     *
     */
    function matchUrl(string $url) {
        $data = [];
        $oembedData =[];
        $encodedUrl = urlencode($url);

        if ($this->isNetworkEnabled()) {
            $oembedData = $this->oembed("https://soundcloud.com/oembed?url=" . $encodedUrl . "&format=json");

            if (array_key_exists('html', $oembedData)) {
                $data = $this->parseResponseHtml($oembedData['html']);
            }
        }

        $data['attributes']['url'] = htmlspecialchars("https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/");

        if (array_key_exists('height', $oembedData)) {
            $data['height'] = $oembedData['height'];
        }

        return $data;
    }

    /**
     * @inheritdoc
     *
     */
    public function renderData(array $data): string {
        $height = htmlspecialchars($data['height']);
        $track = htmlspecialchars($data['attributes']['track']);
        $showArtwork = htmlspecialchars($data['attributes']['showArtwork']);
        $visual = htmlspecialchars($data['attributes']['visual']);
        $url = htmlspecialchars($data['attributes']['url']);

        $result = <<<HTML
<div class="embed embedSoundCloud">
<iframe width="100%" height="{$height}" scrolling="no" frameborder="no" 
    src="{$url}{$track}&show_artwork={$showArtwork}&visual={$visual}">
</iframe>
</div>
HTML;
         return $result;
    }

    /**
     *  Parses the oembed repsonse html for permalink and other data.
     *
     * @param string $html
     * @return array $data
     */

    public function parseResponseHtml(string $html): array {
        $data = [];
        preg_match('/(visual=(?<visual>true))/i', $html,$showVisual );
        if ($showVisual) {
            $data['attributes']['visual'] = $showVisual['visual'];
        }
        preg_match('/(show_artwork=(?<artwork>true))/i', $html,$showArtwork );
        if ($showArtwork) {
            $data['attributes']['showArtwork'] = $showArtwork['artwork'];
        }
        preg_match('/(?<=2F)(?<track>\d+)(&)/', $html, $trackNumber);
        if ($trackNumber) {
            $data['attributes']['track'] = $trackNumber['track'];
        }

        return $data;
    }

}
