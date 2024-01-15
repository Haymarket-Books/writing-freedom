<script>
    import { onMount } from "svelte";
    import { fade, fly, scale } from 'svelte/transition';
    import joinNames from "../../utils/joinNames";
    import urlFor from "../../lib/sanity.urlForImage";
    export let fellows;
    export let defaultYear;
    // console.log('data', fellows)

    // initialize as undefined on load
    let url;
    let params;
    let filterYear = parseInt(defaultYear);
    let filteredFellows = [];

    $: filteredFellows = fellows.filter((fellow) => {
        console.log('log every filter', fellow)
        return fellow.fellowshipYear === parseInt(filterYear)});
    $: console.log('filtered', filteredFellows)

    // filteredFellows = fellows.filter((fellow) => fellow.fellowshipYear === filterYear);
    // console.log('filtered fellows', filteredFellows)

    // async function filterFellows(filterYear) {
    //     const filtered = await fellows.filter((fellow) => fellow.fellowshipYear === filterYear);
    //     return filtered;
    // }

    onMount(() => {
        url = window.location;
        console.log('on mount url', url)
        params = new URLSearchParams(url.search);
        console.log('on mount params', params);
        filterYear = params.get('year') || 2024;
        console.log('on mount filterYear', filterYear);
    });

    /** @param {MouseEvent} event */
    function filterByYear(event) {
        // const url = window.location;
        // console.log(url);

        const year = event.target.innerText;
        const params = new URLSearchParams([
            ['year', year]
        ]);
        filterYear = params.get('year');
        window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
        console.log(filterYear)
    }

</script>

<div>
    <div class="filters cluster">Filter year<button on:click={filterByYear}>2024</button><button on:click={filterByYear}>2025</button></div>
    <h3>Selected year is {filterYear}</h3>
    <div class="responsive-grid">
        {#if filteredFellows.length > 0}
        {#each filteredFellows as fellow}
            <article transition:fly={{ duration: 300, y: '1rem' }} >
                <a href={`/fellows/${fellow.fellowshipYear}/${fellow.slug}`}>
                    <img src={fellow.astroImage.src} alt={fellow.astroImage.attributes.alt} width={fellow.astroImage.attributes.width} height={fellow.astroImage.attributes.height} loading={fellow.astroImage.attributes.loading} />
                </a>
                <p>{joinNames(fellow.name)}</p>
                <p>{fellow.fellowshipYear}</p>
                <p>{fellow.category.name}</p>
            </article>
        {/each}
        {:else}
            <div>No years selected.</div>
        {/if}
    </div>
</div>

<style>
    .filters {
        margin-block-end: 3rem;
    }

    .responsive-grid {
        --grid-gap: 2rem;
        --item-min-width: 12rem;
        --item-max-width: 14rem;
  }
</style>