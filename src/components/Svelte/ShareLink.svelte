<script>
import { onMount } from "svelte"
export let url = 'example url';
export let title = 'example title';

let webShareSupported;
let clipboardSupported;
let shareFeedback = '';
let copyFeedback = '';

onMount(() => {
    webShareSupported = navigator.share;
    clipboardSupported = navigator.clipboard;
    console.log(navigator);
})

async function shareLink() {
    navigator.share({
        title,
        url,
        text: title
    }).then(() => {
        console.log('sharing', url);
        shareFeedback = 'Link shared!';
        setTimeout(() => {
            shareFeedback = '';
        }, 3000);
    }).catch((error) => console.error('Error sharing', error))
}

async function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
        console.log('copied', url);
        copyFeedback = 'Link copied!';
        setTimeout(() => {
            copyFeedback = '';
        }, 3000);
    }).catch((error) => console.error('Error copying', error));
}
</script>

<div id="share">
    <div class="share-heading | cluster">
        <i class="fa-regular fa-share-nodes"></i>
        <p class="small-title">Share Audio</p>
    </div>
    <div class="buttons | cluster">
        {#if webShareSupported}
            <div class="relative">
                <button class="share-btn | cluster" on:click={shareLink}><i class="fa-regular fa-share"></i>Share audio</button>
                <p class="context-alert" role="alert" aria-live="polite" data-show={ shareFeedback.length ? null : 'empty' }>{shareFeedback}</p>
            </div>
        {/if}
        {#if clipboardSupported}
            <div class="relative">
                <button class="share-btn | cluster" on:click={copyLink}><i class="fa-regular fa-copy"></i>Copy Link</button>
                <p class="context-alert" role="alert" aria-live="polite" data-show={ copyFeedback.length ? null : 'empty' }>{copyFeedback}</p>
            </div>
        {/if}
    </div>
</div>

<style>
    /* #share {
        margin-block-start: var(--space-s);
    } */

    .share-heading {
        color: var(--color-accent-light);

        &.cluster {
            --cluster-space: 0.75rem;
        }
    }

    .buttons {
        margin-block-start: 1rem;

        &.cluster {
            --cluster-space: 0.75rem;
        }
    }

    .share-btn {
      --foreground: var(--color-primary-light);
      --background: var(--color-accent-base);
      font-size: var(--step--1);
      padding: 0.5rem 0.75rem;
      background-color: var(--background);
      color: var(--foreground);
      border: 0;
      /* border: 1px solid color-mix(in srgb, var(--foreground) 25%, white); */
      border-radius: var(--rounded-corners-small);
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: color-mix(in srgb, var(--background) 90%, black);
      }
    }

    .share-btn.cluster {
        --cluster-space: 0.5rem;
    }

    .context-alert {
        position: absolute;
        inset: auto 0 calc(100% + 0.5rem) 0;
        padding: 0.25rem;
        background: var(--color-text-heading);
        color: var(--color-white);
        font-size: var(--step--1);
        line-height: var(--leading-tight);
        text-align: center;
        border-radius: var(--rounded-corners-small);
        transition: all 0.2s ease;

        &[data-show="empty"] {
          opacity: 0;
          transform: translateY(0.25rem);
          transition: none;
        }
    }

</style>