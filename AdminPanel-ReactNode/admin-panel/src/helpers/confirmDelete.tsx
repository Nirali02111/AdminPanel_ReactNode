import Swal from "sweetalert2";

export const confirmDelete = async (cb: Function, recordName?: string) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this ${recordName || 'record'}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    })
    if (result.isConfirmed) {
        try {
            await cb()
            Swal.fire({
                title: "Deleted!",
                text: "Your record has been deleted.",
                icon: "success"
            });
        } catch (e) {
            Swal.fire({
                title: "Exception!",
                text: "Unable to delete the record",
                icon: "error",
            });
        }
    } else if (
        result.dismiss === Swal.DismissReason.cancel
    ) {
        Swal.fire({
            title: "Cancelled",
            text: "Your record is safe :)",
            icon: "error"
        });
    }
}